import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(res => {
      console.log(res)
    })
  }

}
