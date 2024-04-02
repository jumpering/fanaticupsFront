import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '@material/material.module';
import { CommonModule } from '@angular/common';
import { Message } from '../models/message.model';
import { ChatService } from '../services/chat.service';
import { AuthService } from '@auth/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{

  @Input() cupId?: number;
  public form: FormGroup;
  public listOfMessages: Message[] = [];
  public hasSession$!: Observable<boolean>; 

  constructor(
    private formBuilder: FormBuilder,
    private chatService: ChatService,
    private authService: AuthService
    ){
      this.hasSession$ = this.authService.hasSession();
      this.form = this.formBuilder.group({
        messageInput: ['', [Validators.required, Validators.maxLength(250)]]
      });
      //this.form.markAllAsTouched();
    }

  ngOnInit(): void {
    this.chatService.getAllMessages(this.cupId).subscribe({
      next: (elements: Message[]) =>{
        this.listOfMessages.push(...elements);
      },
      error: err => {
        console.log('Error fetching messages: ' + err);
      },
      complete: () => {
        //
      }
    });
  }

  public onChangeMessageInput(){
    this.form.markAllAsTouched();
  }

  public sendMessage():void {
    this.chatService.addMessage(this.cupId, this.form.get("messageInput")?.value).subscribe({
      next: (element: Message) => {
        this.listOfMessages.push(element);
      },
      error: (err) => {
        console.log('Error sending message ' + err);
      },
      complete: () => {
        this.form.get("messageInput")?.setValue('');
        this.form.get("messageInput")?.clearValidators();
        this.form.get("messageInput")?.markAsUntouched();
        //this.form.get("messageInput")?.addValidators(Validators.maxLength(250));
      }
    });

  }

}
