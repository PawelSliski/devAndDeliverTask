import { ConflictException, Injectable, Inject, BadRequestException } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "./interfaces/user.entity";
import * as bcrypt from "bcrypt";
import { JwtPayload } from "src/auth/interfaces/jwtPayload.interface";
import { JwtService } from "@nestjs/jwt";
import axios from "axios";

@Injectable()
export class UsersService {
  constructor(@Inject("USER_MODEL") private userModel: Model<User>, private jwtService: JwtService) { }

  createUser(userData: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.userModel.create(userData, function (error: Error, user: User) {
        if (error) reject(error);
        resolve(user)
      });
    });
  }

  getUserByEmail(email: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.userModel.findOne({email: email}, function(error: Error, user: User) {
        if(error) reject(error)
        resolve(user);
      });
    });
  }

  isValidEmail(email: string){
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( email );	
    //rfc822 check
  }

  getRandomId(heroesCount: number): number {
    return Math.floor(Math.random() * heroesCount) + 1  
  }

  async register(user: User): Promise<JwtPayload | Error> {
    if(!this.isValidEmail(user.email))
      return new BadRequestException("Wrong e-mail format");
    const existingUser: User = await this.getUserByEmail(user.email);
    if(existingUser)
      return new ConflictException("User already exists");
    const encryptedPassword: string = await bcrypt.hash(user.password, 10);
    const charactersUrl: string = process.env.PEOPLE_URL;
    const heroesCount: number = await axios.get(charactersUrl).then((response) => { return response.data.count}).catch((err: Error) => new BadRequestException(err));
    const userData: User = {
      email: user.email,
      password: encryptedPassword,
      heroId: this.getRandomId(heroesCount),
    };
    const jwt = this.jwtService.sign({email: user.email});
    try{
      const createdUser: User = await this.createUser(userData);
      createdUser.password = null;
      return {
        user: createdUser,
        token: jwt
      };
    } catch (e) {
      throw new ConflictException(e);
    };
  };

}