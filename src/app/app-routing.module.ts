import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ErrorPageComponent} from "./error-page/error-page.component";

const routes: Routes = [
  {
    path: 'home', loadChildren: () => {
      return import('./home/home.module').then(
        (m) => {
          return m.HomeModule;
        }
      );
    }
  },
  // {
  //   path: 'score', loadChildren: () => {
  //   //   return import('./scores/score.module').then(
  //   //     (m) => {
  //   //       return m.ScoreModule;
  //   //     }
  //   //   );
  //   // }
  // },
  {
    path: 'game', loadChildren: () => {
      return import('./board/board.module').then(
        (m) => {
          return m.BoardModule;
        }
      );
    }
  },
  {path: '**', redirectTo:'home'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
