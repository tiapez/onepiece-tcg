import { Injectable } from "@angular/core";
import { Adapter } from "../../Adapter/adapter";

export class User {
  public id!: number;
  public username!: string;
  public password!: string;
  public mail!: string;
  public nick!: string;
  public navbar!: string;
  public language!: string;
  public condition!: number;
  public image!: Blob;
}

@Injectable({
  providedIn: "root",
})
export class UserAdapter implements Adapter<User> {
  adapt(item: any): User {
    let u = new User();
    u.username = item.username;
    u.password = item.password;
    u.mail = item.mail;
    u.nick = item.nick;
    u.navbar = item.navbar;
    u.language = item.language;
    u.condition = item.condition;
    u.image = item.image;
    return u;
  }
}


@Injectable({
  providedIn: "root",
})
export class UserAdapter2 implements Adapter<User> {
  adapt(item: any): User {
    let u = new User();
    u.mail = item.mail;
    u.nick = item.nick;
    u.username = item.username;
    u.password = item.password;
    return u;
  }
}