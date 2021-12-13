import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'today',
    pathMatch: 'full'
  },
  {
    path: 'today',
    loadChildren: () => import('./today/today.module').then( m => m.TodayPageModule)
  },
  {
    path: 'tomorrow',
    loadChildren: () => import('./tomorrow/tomorrow.module').then( m => m.TomorrowPageModule)
  },
  {
    path: 'next-days',
    loadChildren: () => import('./next-days/next-days.module').then( m => m.NextDaysPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
