import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ErrorPageComponent} from "./error-page/error-page.component";

const routes: Routes = [
  {
    path: '', loadChildren: () => {
      return import('./home/home.module').then(
        (m) => {
          return m.HomeModule;
        }
      );
    }
  },
  {
    path: 'game', loadChildren: () => {
      return import('./board/board.module').then(
        (m) => {
          return m.BoardModule;
        }
      );
    }
  },
  {path: '**', component: ErrorPageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
