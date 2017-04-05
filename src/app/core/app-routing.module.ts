import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'auth',
                loadChildren: '../auth/auth.module#AuthModule'
            },
            {
                path: '',
                redirectTo: '/map',
                pathMatch: 'full'
            }
            /*{
                path: '**',
                component: PageNotFoundComponent
            }*/
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
