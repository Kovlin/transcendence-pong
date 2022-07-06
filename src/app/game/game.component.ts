import { Component, OnInit, OnDestroy } from '@angular/core';

import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { Socket, io } from 'socket.io-client';

var interv: any;
var padLen: number = 60;
var padHei: number = 15;

var ballR = 10;

@Component({
  selector: 'app-game',
	templateUrl: './game.component.html',
  styles: [
  ]
})

export class GameComponent implements AfterViewInit {

	@ViewChild('board', { static: false }) canvas: ElementRef<HTMLCanvasElement>;

	key: string;
	x = 5;
	y = Math.floor(window.innerHeight / 8);

	@HostListener('document:keydown', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) { 
		this.key = event.key;
			switch(this.key) {
				case 'w':
					this.updateSpeed(1);
					break;
				case 's':
					this.updateSpeed(2);
					break;
			}
	}
	@HostListener('document:keyup', ['$event'])
  	handleKeyboard(event: KeyboardEvent) { 
    this.key = event.key;
		switch(this.key) {
			case 'w':
				this.updateSpeed(0);
				break;
			case 's':
				this.updateSpeed(0);
				break;
		}
  }

	updateSpeed(x: number) {
		let test = this.socket.emit("speed", [x]);
		// this.socket.emit('speed', x, (response: any) =>
		// 	console.log('speed:', response[1]),
		// );
	}

	// @HostListener('window:resize', ['$event'])
	// onResize() {
	// 	this.canvas.nativeElement.width = window.innerWidth / 2;
	// 	this.canvas.nativeElement.height = window.innerHeight / 3;
	// }

	private ctx: CanvasRenderingContext2D|any;

	ngAfterViewInit() : void {
		this.canvas.nativeElement.width = 650;
		this.canvas.nativeElement.height = 480;

		this.ctx = this.canvas.nativeElement.getContext('2d');
		this.update();
		interv = setInterval( () => {this.update()}, 50);
	}

	private socket: any;
	ngOnInit(): void {
		this.socket = io("http://localhost:3000");
	}

	start() {
		this.socket.emit("go", [true]);
		console.log("GO");
	}

	pause() {
		this.socket.emit("go", [false]);
		console.log("PAUSE");
	}

	update() {
		this.socket.emit("start", [this.canvas.nativeElement.width, this.canvas.nativeElement.height], (response: any) =>
			{
				if (response["gameOk"] != 1)
					return;
				console.log('ballX', response["ballX"]);
				console.log('ballY', response["ballY"]);
				console.log('X:', response["x"]);
				console.log('Y:', response["y"]);

				let x = response["x"];
				let y = response["y"];
				let ballX = response["ballX"];
				let ballY = response["ballY"];
				let score = response["score"];
				let score2 = response["score2"];

				let x2 = response["x2"];
				let y2 = response["y2"];

				this.ctx.fillStyle = "black";
				this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
				this.ctx.fillStyle = "white";
				this.ctx.fillRect(x, y, padHei, padLen);
				this.ctx.fillRect(x2, y2, padHei, padLen);

				this.ctx.fillRect(ballX, ballY, ballR, ballR);
				console.log(ballX, ballY, ballR);

				this.ctx.fillRect(this.canvas.nativeElement.width / 2, 0, 2, this.canvas.nativeElement.height);
				
				this.ctx.font = "30px Comic Sans MS";
				this.ctx.textAlign = "center";
				this.ctx.fillText(`Score: ${score}`, 70, 30);
				this.ctx.fillText(`Score: ${score2}`, this.canvas.nativeElement.width - 70, 30);
			}
		);
	}

	onDestroy(): void {
		clearInterval(interv);
	}
}
