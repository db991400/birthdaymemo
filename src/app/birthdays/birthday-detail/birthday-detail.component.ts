import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FileUploader } from 'ng2-file-upload';
import { NgbDatepickerI18n, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { BirthdayService, Friend } from '../birthday.service';
import { I18n, CustomeDatePickerI18n } from '../datepicker-i18n';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { JumbotronServive, Jumbotron } from '../../jumbotron.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../user.service';
import { AuthTokenService } from '../../authtoken.service';

@Component({
  selector: 'app-birthday-detail',
  templateUrl: './birthday-detail.component.html',
  styleUrls: ['./birthday-detail.component.css'],
  providers: [
    NgbDatepickerConfig,
    [I18n, { provide: NgbDatepickerI18n, useClass: CustomeDatePickerI18n }]]
})
export class BirthdayDetailComponent implements OnInit {
  friend: Friend = new Friend(0, '', null, '', '', '', '', '', 0);
  showAddImg = false;     //是否显示添加相片图片
  showSelectImg = false;    //是否显示选择的图片
  selectImg = '';         //选择的图片路径
  mbirthday: NgbDateStruct;
  birthdayForm: FormGroup;
  isNew: boolean = false;    //是否新建朋友信息
  uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3000/friends/updateImg',
    method: 'POST',
    itemAlias: 'file',
    autoUpload: false,
    allowedFileType: ['image'],
    authToken: 'Bearer ' + this.tokenServ.getToken()
  })
  //获取文件上传控件
  @ViewChild('updateImg') updateImg: ElementRef;

  constructor(
    private jumServ: JumbotronServive,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private tokenServ: AuthTokenService,
    private birServ: BirthdayService,
    private config: NgbDatepickerConfig) {
    this.uploader.onSuccessItem = this.successItem.bind(this);
    this.createForm();
    config.minDate = { year: 1949, month: 1, day: 1 };
    config.maxDate = { year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDay() };
  }

  //创建动态表单
  createForm() {
    this.birthdayForm = this.fb.group({
      fname: [this.friend.fname, Validators.required],
      fnumber: [this.friend.fnumber,
      [Validators.required,
      // 匹配开头为1-9,11位数组组成
      Validators.pattern(/^[1-9]\d{10}$/)]],
      // femail: [this.friend.femail, Validators.email],
      femail: [this.friend.femail,
        Validators.pattern(/^([a-zA-Z0-9_\.\-]+)@([a-zA-Z0-9_\.\-]+)\.([a-zA-Z]{2,4})$/)],
      fbirthday: [this.mbirthday, Validators.required],
      fgroup: [this.friend.fgroup, Validators.required]
    })
  }
  //动态表单验证，需要get函数
  get fname() { return this.birthdayForm.get('fname'); }
  get fnumber() { return this.birthdayForm.get('fnumber'); }
  get femail() { return this.birthdayForm.get('femail'); }
  get fbirthday() { return this.birthdayForm.get('fbirthday'); }
  get fgroup() { return this.birthdayForm.get('fgroup'); }
  //刷新form
  reset() {
    this.birthdayForm.reset({
      fname: this.friend.fname,
      fnumber: this.friend.fnumber,
      femail: this.friend.femail,
      fbirthday: this.mbirthday,
      fgroup: this.friend.fgroup
    });
  }
  //保存用户数据
  prepareSave(): Friend {
    const formModel = this.birthdayForm.value;
    //console.log(this.mbirthday);
    const friend = new Friend(this.friend.fid, formModel.fname,
      new Date(this.mbirthday.year, this.mbirthday.month - 1, this.mbirthday.day),
      formModel.fnumber, formModel.femail, formModel.fgroup, 'normal', this.selectImg, this.friend.uid);
    return friend;
  }
  //提交表单
  onSubmit() {
    this.friend = this.prepareSave();
    console.log(this.friend);
    if (!this.isNew) {
      this.birServ.editFriend(this.friend).subscribe(
        resp => {
          if (resp['code'] === '200') {
            console.log('修改信息成功！');
            this.router.navigate(['/birthday']);
          }
        },
        err => alert(this.birServ.handleError(err)),
        () => console.log('response complete!'));
    } else {
      this.birServ.newFriend(this.friend).subscribe(
        resp => {
          if (resp['code'] === '200') {
            console.log('修改信息成功！');
            this.router.navigate(['/birthday']);
          }
        },
        err => alert(this.birServ.handleError(err)),
        () => console.log('response complete!')
      );
    }

  }
  //重置表单
  onCancel() {
    this.reset();
  }
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    //console.log(id);
    if (Number.parseInt(id) === 0) {
      this.jumServ.setJumbotron(new Jumbotron('New Friend', '', ''));
      this.isNew = true;
    } else {
      this.birServ.getFriend(id).subscribe(
        rs => {
          //console.log(rs);
          this.friend = new Friend(rs.fid, rs.fname, rs['fbirth'],
            rs.fpnumber, rs.femail, rs.fgroup, rs.state, `http://localhost:3000${rs.photo}`, rs.uid);
          this.friend.fbirth = new Date(rs['fbirth']);
          //console.log(this.friend.fbirth);
          console.log(this.friend);
          this.jumServ.setJumbotron(new Jumbotron(rs['fname'], '', ''));
          this.showSelectImg = true;
          this.selectImg = this.friend.photo;
          this.mbirthday = {
            year: this.friend.fbirth.getFullYear(), month:
              this.friend.fbirth.getMonth() + 1, day: this.friend.fbirth.getDate()
          }
          //值发生变化时重置表单
          this.reset();
          //console.log(this.selectImg);
        },
        (err) => {
          this.birServ.handleError(err);
        },
        () => console.log('The Post observable is now completed.')
      );
    }
  }


  //显示添加用户的图片
  showAddImage() {
    this.showAddImg = true;
  }
  //隐藏显示用户的图片
  hideAddImage() {
    this.showAddImg = false;
  }
  //获取到图片文件后
  getImage(event: any) {
    console.log('开始上传文件');
    //开始上传
    this.showSelectImg = false;
    this.selectImg = '';
    this.uploader.uploadAll();
  }
  //文件上传成功后的处理函数
  successItem(item, response, status, headers) {
    if (status === 200) {
      this.selectImg = "http://localhost:3000" + response;
      this.showSelectImg = true;
      //this.selectImg = '/assets/images/person.png';
      alert('上传图片成功！');
      console.log(this.selectImg);
    } else {
      alert('上传图片失败！');
    }
  };
}
