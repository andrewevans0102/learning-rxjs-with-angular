import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  imports: [CommonModule],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
  ],
  declarations: [],
})
export class MaterialModule {}
