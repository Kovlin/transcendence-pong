import { Component, OnInit, OnDestroy } from '@angular/core';

import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';

var speed = 0;
var speedU = -10;
var speedD = 10;
var interv: any;
var padLen: number = 60;
var padHei: number = 15;

var ballR = 10;
var ballX = 120;
var ballY = 120;
var ballYS = -5;
var ballXS = 5;
var score = 0;

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
					speed = speedU;
					break;
				case 's':
					speed = speedD;
					break;
			}
	}
	@HostListener('document:keyup', ['$event'])
  	handleKeyboard(event: KeyboardEvent) { 
    this.key = event.key;
		switch(this.key) {
			case 'w':
				speed = 0;
				break;
			case 's':
				speed = 0;
				break;
		}
  	}

	@HostListener('window:resize', ['$event'])
	onResize() {
		this.canvas.nativeElement.width = window.innerWidth / 2;
		this.canvas.nativeElement.height = window.innerHeight / 3;
	}

	private ctx: CanvasRenderingContext2D|any;

	ngAfterViewInit() : void {
		this.canvas.nativeElement.width = window.innerWidth / 2;
		this.canvas.nativeElement.height = window.innerHeight / 3;

		this.ctx = this.canvas.nativeElement.getContext('2d');
		this.update();
		interv = setInterval( () => {this.update()}, 50);
	}

	isInBound(): boolean{
		console.log(this.y + padLen);
		let check =  window.innerHeight / 3;;
		console.log(check);
		if ((this.y + speed < 0) || (this.y + padLen + speed >  window.innerHeight / 3))
			return false;
		return true;
	}

	update() {
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(this.x, this.y, padHei, padLen);
		if (this.isInBound())
			this.y += speed;


		if (ballY < ballR || ballY > this.canvas.nativeElement.height - ballR) {
			ballYS = - ballYS;
		}

		if (ballX < ballR) {
			ballX = 120;
			ballY = 120;
			ballYS = -5;
			ballXS = 5;
			score = 0;
		}

		if (ballX > this.canvas.nativeElement.width) {
			ballX -= ballXS;
			ballXS = -ballXS
		}

		ballY += ballYS;
		ballX += ballXS;

		this.ctx.fillRect(ballX, ballY, ballR, ballR);
		console.log(ballX, ballY, ballR);

		if (ballX - ballR <= padHei + this.x && ballX > this.x) {
			if (ballY >= this.y && ballY <= this.y + padLen) {
				ballXS = -ballXS;
				score += 1;
			}
		}

		this.ctx.fillRect(this.canvas.nativeElement.height / 2, 0, 2, this.canvas.nativeElement.height);
		
		this.ctx.font = "30px Comic Sans MS";
		this.ctx.textAlign = "center";
		this.ctx.fillText(`Score: ${score}`, 60, 30);

		console.log("update call");
	}

	onDestroy(): void {
		clearInterval(interv);
	}
}
