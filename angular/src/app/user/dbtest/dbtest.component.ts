import { Component, inject } from '@angular/core';
import { InputModule } from '../../module/input/input.module';
import { MatButtonModule } from '@angular/material/button';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface UserTest {
  name: string;
  email: string;
  id?: string;
}

@Component({
  selector: 'app-dbtest',
  imports: [
    InputModule,
    MatButtonModule,
  ],
  templateUrl: './dbtest.component.html',
  styleUrl: './dbtest.component.scss'
})
export class DbtestComponent {
  data = {
    name: '',
    email: '',
  };
  db = inject(AngularFirestore);
  userTests: UserTest[] = [];
  constructor(
  ) {
    this.db.collection('userTests').valueChanges({ idField: 'id' }).subscribe(data => {
      this.userTests = data as UserTest[];
    });
  }

  addUser() {
    this.db.firestore.collection('userTests').add(this.data);
    this.data = {
      name: '',
      email: '',
    };
  }

  deleteUser(userTest: UserTest) {
    this.db.firestore.collection('userTests').doc(userTest.id).delete();
  }

  updateUser(userTest: UserTest) {
    this.db.firestore.collection('userTests').doc(userTest.id).update(userTest);
  }
}
