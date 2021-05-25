import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//COMPONENTES
import { UserLogComponent } from './components/user-log/user-log.component';
import { HomeComponent } from './components/home/home.component';
import { CreatePodcastComponent } from './components/create-podcast/create-podcast.component';
import { VerPodcastComponent } from './components/ver-podcast/ver-podcast.component';
import { EditPodcastComponent } from './components/edit-podcast/edit-podcast.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const appRoutes:Routes=[
    {path:'',component: HomeComponent},
    {path:'home',component: HomeComponent},
    {path:'home/:page',component: HomeComponent},
    {path:'logs',component: UserLogComponent},
    {path:'logout/:salir',component: UserLogComponent},
    {path:'new-podcast',component: CreatePodcastComponent},
    {path:'podcast/:id',component: VerPodcastComponent},
    {path:'podcast/edit/:id', component:EditPodcastComponent},
    {path:'user/:username', component:UserProfileComponent},
    {path:'user/:username/:page', component:UserProfileComponent},
    {path:'user-edit', component:UserEditComponent},

    {path:'**',component: HomeComponent}
];

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders<any>=RouterModule.forRoot(appRoutes);