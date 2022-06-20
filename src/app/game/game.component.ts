import { Expression } from '@angular/compiler';
import { Component, OnInit, } from '@angular/core';

import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';

// import { Subscription, timer, map } from 'rxjs';

var BOARD_W = 400;
var BOARD_H = 800;
var speed = 20;

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
		console.log(this.key);
		console.log(`x: ${this.x}, y: ${this.y}`)
		switch(this.key) {
			case 'w':
				this.y -= speed;
				break;
			// case 'a':
			// 	this.x -= 10;
			// 	break;
			case 's':
				this.y += speed;
				break;
			// case 'd':
			// 	this.x += 10;
			// 	break;
		}
		if (this.y + 60 > this.canvas.nativeElement.height)
			this.y -= speed;
			if (this.y < 0)
			this.y += speed;
		// this.update();
		window.requestAnimationFrame( () => this.update());
  }

	// timerSub: Subscription;
	// ngOnInit() : void {
	// 	this.timerSub = timer(0, 0).pipe(
	// 		map(() => {
	// 			this.update();
	// 		})
	// 	).subscribe()
	// }
	// ngOnDestroy(): void { 
	// 	this.timerSubscription.unsubscribe(); 
	// } 


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
    this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
		this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.x, this.y, 15, 60);
		window.requestAnimationFrame( () => this.update());
	}

	update() {
		this.ctx.fillStyle = "black";
		// this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
		this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
		this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.x, this.y, 15, 60);
    // this.ctx.stroke();
	}

}
