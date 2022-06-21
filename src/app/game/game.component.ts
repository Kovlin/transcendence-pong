// import { Component, OnInit, } from '@angular/core';

// import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
// import { HostListener } from '@angular/core';

// // import { Subscription, timer, map } from 'rxjs';

// var BOARD_W = 400;
// var BOARD_H = 800;
// var speed = 20;
// var move = false;

// @Component({
//   selector: 'app-game',
// 	templateUrl: './game.component.html',
//   styles: [
//   ]
// })

// export class GameComponent implements AfterViewInit {

// 	@ViewChild('board', { static: false }) canvas: ElementRef<HTMLCanvasElement>;

// 	key: string;
// 	x = 5;
// 	y = Math.floor(window.innerHeight / 8);

// 	@HostListener('document:keydown', ['$event'])
//   handleKeyboardEvent(event: KeyboardEvent) { 
//     this.key = event.key;
// 		console.log(this.key);
// 		console.log(`x: ${this.x}, y: ${this.y}`)
// 		switch(this.key) {
// 			case 'w':
// 				this.y -= speed;
// 				break;
// 			// case 'a':
// 			// 	this.x -= 10;
// 			// 	break;
// 			case 's':
// 				this.y += speed;
// 				break;
// 			// case 'd':
// 			// 	this.x += 10;
// 			// 	break;
// 		}
// 		if (this.y + 60 > this.canvas.nativeElement.height)
// 			this.y -= speed;
// 			if (this.y < 0)
// 			this.y += speed;
// 		this.update();
// 		// window.requestAnimationFrame( () => this.update());
//   }

// 	@HostListener('window:resize', ['$event'])
// 	onResize() {
// 		this.canvas.nativeElement.width = window.innerWidth / 2;
// 		this.canvas.nativeElement.height = window.innerHeight / 3;
// 	}

// 	private ctx: CanvasRenderingContext2D|any;

// 	ngAfterViewInit() : void {
// 		this.canvas.nativeElement.width = window.innerWidth / 2;
// 		this.canvas.nativeElement.height = window.innerHeight / 3;

// 		this.ctx = this.canvas.nativeElement.getContext('2d');
//     this.ctx.fillStyle = "black";
// 		this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
// 		this.ctx.fillStyle = "white";
//     this.ctx.fillRect(this.x, this.y, 15, 60);
// 		window.requestAnimationFrame( () => this.update());
// 	}

// 	update() {
// 		this.ctx.fillStyle = "black";
// 		// this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
// 		this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
// 		this.ctx.fillStyle = "white";
//     this.ctx.fillRect(this.x, this.y, 15, 60);
//     this.ctx.stroke();
	
// 	}
// }

import { Component, OnInit, OnDestroy } from '@angular/core';

import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';

var BOARD_W = 400;
var BOARD_H = 800;
var speed = 0;
var speedU = -10;
var speedD = 10;
var move = false;
var interv: any;

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
		// if (this.y + 60 > this.canvas.nativeElement.height)
		// 	this.y -= speed;
		// 	if (this.y < 0)
		// 	this.y += speed;
		// this.update();
		// window.requestAnimationFrame( () => this.update());
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
		// if (this.y + 60 > this.canvas.nativeElement.height)
		// 	this.y -= speed;
		// 	if (this.y < 0)
		// 	this.y += speed;
		// this.update();
		// window.requestAnimationFrame( () => this.update());
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

	update() {
		this.ctx.fillStyle = "black";
		// this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
		this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
		this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.x, this.y, 15, 60);
    this.ctx.stroke();
		this.y += speed;
		console.log("update call");
	}

	onDestroy(): void {
		clearInterval(interv);
	}
}
