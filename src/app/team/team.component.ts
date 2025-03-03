import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HeadBarComponent } from '../head-bar/head-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../services/auth.service';
import { UserDataService } from '../services/user-data.service';
import { TeamService } from '../services/team.service';

interface department {
  value: string;
  viewValue: string;
}

interface role {
  value: string;
  viewValue: string;
}

export interface teamMembers {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
  emp_code: string;
  mobile_number:string,
}

@Component({
  selector: 'app-team',
  imports: [
    HeadBarComponent,
    MatMenuModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatLabel,
    MatOptionModule,
    MatInputModule,
    NgIf,
    NgClass,
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
 // constructor(private router: Router, private dialog: MatDialog) {}
 // label = input('');
   teamData : any;
   currentUser: any;
   teamRoles: any;
 
   constructor(
     private router: Router,
     private authService: AuthService,
     private userDataService:UserDataService,
     private teamService: TeamService
     ) {}
 

  departments: department[] = [
    { value: 'Business', viewValue: 'Business' },
    { value: 'Product', viewValue: 'Product' },
    { value: 'Production', viewValue: 'Production' },
    { value: 'Finance', viewValue: 'Finance' },
    { value: 'Sales', viewValue: 'Sales' },
    { value: 'Human Resource', viewValue: 'Human Resource' },
    { value: 'Marketing', viewValue: 'Marketing' },
    { value: 'Customer Support', viewValue: 'Customer Support' },
    { value: 'Engineering', viewValue: 'Engineering' },
    { value: 'R&D', viewValue: 'R&D' },
    { value: 'IT', viewValue: 'IT' },
    { value: 'Others', viewValue: 'Others' },
  ];

  roles: role[] = [
    { value: 'Admin', viewValue: 'Admin' },
    { value: 'Bill Approver', viewValue: 'Bill Approver' },
    { value: 'Employee', viewValue: 'Employee' },
    { value: 'Manager', viewValue: 'Manager' },
    { value: 'Owner', viewValue: 'Owner' },
    { value: 'Tax Consultant', viewValue: 'Tax Consultant' },
    { value: 'Add Custom Role', viewValue: 'Add Custom Role' },
  ];

  teamForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    department: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });

  teamMember: any = {
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    role: '',
    
  };

 errorMessage: string ='';

  ngOnInit(): void {
    this.loadTeamData();
  }


  userData:any;
  loadTeamData(): void {
    this.teamService.teamData().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.teamData = response.data.map((member: any) => ({
            firstName: member.first_name,
            lastName: member.last_name,
            email: member.email_id,
            department: member.departments_id ? member.department.data.name  : '',
            role: member.role_name,
            emp_code: member.emp_code,
            mobile_number: member.mobile_number,
          }));
  
          this.dataSource.data = this.teamData;
        }
      }, (error) => {
       this.errorMessage='Failed to fetch data.'
      }
    );

    this.teamService.teamRoles().subscribe(
      (response) => {
        this.teamRoles = response;
      });

  }

  pageTwo():void{
this.teamService.teamData2().subscribe(
  (response:any) => {
    if (response && response.data) {
      this.teamData = response.data.map((member: any) => ({
        firstName: member.first_name,
        lastName: member.last_name,
        email: member.email_id,
        role: member.role_name,
        department: member.departments_id? member.department.data.name : '',
        mobile_number: member.mobile_number,
        emp_code: member.emp_code
      }));

      this.dataSource.data = this.teamData;
    }
  }, (error) => {
    this.errorMessage='Failed to fetch data.'
   }
)
  }


  pageThree():void{
    this.teamService.teamData3().subscribe(
      (response:any) => {
        if (response && response.data) {
          this.teamData = response.data.map((member: any) => ({
            firstName: member.first_name,
            lastName: member.last_name,
            email: member.email_id,
            department: member.departments_id ? member.department.data.name  : '',
            role: member.role_name,
            emp_code: member.emp_code,
            mobile_number: member.mobile_number,
          }));
    
          this.dataSource.data = this.teamData;
        }
      }, (error) => {
        this.errorMessage='Failed to fetch data.'
       }
    )
      }

      currentPage = 1;

      changePage(pageNumber: number): void {
        this.currentPage = pageNumber;
        if (pageNumber === 1) {
          this.loadTeamData();
        } else if (pageNumber === 2) {
          this.pageTwo();
        } else if (pageNumber === 3) {
          this.pageThree();
        }
      }
      
      previousPage(): void {
        if (this.currentPage > 1) {
          this.changePage(this.currentPage - 1);
        }
      }
      
      nextPage(): void {
        if (this.currentPage < 3) {
          this.changePage(this.currentPage + 1);
        }
      }
      

  dataSource = new MatTableDataSource<teamMembers>();

  saveTeam(teamFormData: any) {
    if (this.teamForm.valid) {
      const newUser = this.teamForm.value;

      const existingData = localStorage.getItem('teamStorage');
      let teamStorage = existingData ? JSON.parse(existingData) : [];
      teamStorage.push(newUser);

      localStorage.setItem('teamStorage', JSON.stringify(teamStorage));
      this.dataSource.data = teamStorage;

      this.teamForm.reset();
      this.closeFormDialog();
      this.paginator.lastPage();
    }
  }

  displayedColumns: string[] = [
    'firstName',
  'emp_code',
  'role',
  'department',
  'actions'
  ];

  overlayVisible = false;
  selectedMember: teamMembers | null = null;
  overlayTeam = false;
  editOverlay = false;

  editOpen(member: teamMembers) {
    this.editOverlay = true;
    this.selectedMember = member;

    this.teamForm.patchValue({
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      department: member.department,
      role: member.role,
    });
  }

  editClose() {
    this.editOverlay = false;
  }

  openFormDialog() {
    this.overlayTeam = true;
  }

  closeFormDialog() {
    this.overlayTeam = false;
  }

  viewDetails(member: teamMembers) {
    this.selectedMember = member;
    this.overlayVisible = true;
  }

  closeOverlay() {
    this.overlayVisible = false;
    this.selectedMember = null;
  }

  position: string[] = [
    'All',
    'Admin',
    'Bill Approver',
    'Employee',
    'Manager',
    'Owner',
    'Tax Consultant',
  ];

  updateForm() {
    if (this.teamForm.valid && this.selectedMember) {
      const updatedMember = this.teamForm.value;
      const existingData = localStorage.getItem('teamStorage');
      if (existingData) {
        const teamStorage = JSON.parse(existingData);
        const memberIndex = teamStorage.findIndex(
          (member: teamMembers) => member.email === this.selectedMember?.email
        );

        if (memberIndex !== -1) {
          teamStorage[memberIndex] = updatedMember;
          localStorage.setItem('teamStorage', JSON.stringify(teamStorage));
          this.dataSource.data = teamStorage;
          this.teamForm.reset();
          this.editClose();
        }
      }
    }
  }

  // role filtering

  selectedRole: string = 'All';
  originalTeamData: teamMembers[] = [];

  applyRoleFilter(role: string): void {
    this.selectedRole = role;

    if (role === 'All') {
      this.dataSource.data = [...this.originalTeamData];
    } else {
      this.dataSource.data = this.originalTeamData.filter(
        (member) => member.role === role
      );
    }
  }

//deleting a team member
  delete(member: teamMembers){
   
      const existingData = localStorage.getItem('teamStorage');
      
      if (existingData) {
        let teamStorage: teamMembers[] = JSON.parse(existingData);
        teamStorage = teamStorage.filter(m => m.email !== member.email);
        localStorage.setItem('teamStorage', JSON.stringify(teamStorage));
        this.dataSource.data = teamStorage;
    }
    
  
  }
}
