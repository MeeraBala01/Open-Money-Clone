import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CashflowComponent } from './side-nav/cashflow/cashflow.component';
import { ReceivablesComponent } from './side-nav/receivables/receivables.component';
import { PayableComponent } from './side-nav/payable/payable.component';
import { ReportsComponent } from './side-nav/reports/reports.component';
import { BankingComponent } from './side-nav/banking/banking.component';
import { CreditComponent } from './side-nav/credit/credit.component';
import { LayoutComponent } from './layout/layout.component';
import { accountGuard } from './guards/account.guard';
import { authenticationGuard } from './guards/authentication.guard';
import { TeamComponent } from './team/team.component';

export const routes: Routes = [
  {
    path: 'sign-up',
    component: SignupPageComponent,
    canActivate: [accountGuard],
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginPageComponent,
    canActivate: [accountGuard],
  },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authenticationGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'cashflow',
        component: CashflowComponent,
      },
      {
        path: 'receivables',
        component: ReceivablesComponent,
      },
      {
        path: 'payable',
        component: PayableComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
      {
        path: 'banking',
        component: BankingComponent,
      },
      {
        path: 'credit',
        component: CreditComponent,
      },
      {
        path: 'team',
        component: TeamComponent,
      },
    ],
  },
  {
    path: 'logout',
    component: LoginPageComponent,
  },
];
