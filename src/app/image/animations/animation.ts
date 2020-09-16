import {
  animation, trigger, animateChild, group,
  transition, animate, style, query, state
} from '@angular/animations';

export const fadeInAnimation =
  trigger('fadeInAnimaton' , [
    transition(':enter', [
      style({
        opacity: 0
      }),
      animate('1s')
    ])
  ]);
