import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-about",
  standalone: true,
  imports: [CommonModule],
  template: ` <p>hello, this is about us page</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  constructor() {}

  ngOnInit(): void {}
}
