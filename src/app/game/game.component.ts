import { Expression } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';

const BOARD_W = 400;
const BOARD_H = 800;

@Component({
  selector: 'app-game',
	templateUrl: './game.component.html',
  styles: [
  ]
})

export class GameComponent implements AfterViewInit {

	@ViewChild('board', { static: false }) canvas: ElementRef<HTMLCanvasElement>;

	key: string;
	x = 0;
	y = 0;

	@HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    this.key = event.key;
		console.log(this.key);
		let arr: Number[] =  [0,0,0,0];
		switch(this.key) {
			case 'w':
				this.x -= 10;
				break;
			case 'a':
				this.y -= 10;
				break;
			case 's':
				this.x += 10;
				break;
			case 'd':
				this.y += 10;
				break;
		}
		this.update();
  }

	private ctx: CanvasRenderingContext2D|any;

	ngAfterViewInit() : void {
		this.canvas.nativeElement.width = BOARD_W;
		this.canvas.nativeElement.height = BOARD_H;

		this.ctx = this.canvas.nativeElement.getContext('2d');
    
	}

	update() {

		this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.ctx.rect(this.x, this.y, this.x + 30, this.y + 30);
    this.ctx.stroke();
	}

}
