import {$, $$} from "@wdio/globals";
import * as path from "path";

describe("validate registration of admin - #TS_SES_0003", ()=>{
    it("validate admin can register with proper credentials - #TC_AR_0001", async ()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/register.php");
        const uploadFile = path.resolve("./uploads/photo.jpg");

        await $(`[name="name"]`).setValue("Bob Roe");
        await $(`[name="email"]`).setValue("bob@g.c");
        await $(`[name="username"]`).setValue("bob123456");
        await $(`[name="password"]`).setValue("12345678");
        await $(`[name="c_password"]`).setValue("12345678");
        await $(`[name="photo"]`).setValue(uploadFile);

        await $(`[name="register"]`).click();

        await expect(await $(`//div[text()="Your Data Inserted!"]`)).toExist();

        await browser.refresh();
    });

    it("validate admin can not register with invalid fullname of user - #TC_AR_0002", async ()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/register.php");
        const uploadFile = path.resolve("./uploads/photo.jpg");

        await $(`[name="name"]`).setValue("123456");
        await $(`[name="email"]`).setValue("bob@g.c");
        await $(`[name="username"]`).setValue("bob123456");
        await $(`[name="password"]`).setValue("12345678");
        await $(`[name="c_password"]`).setValue("12345678");
        await $(`[name="photo"]`).setValue(uploadFile);

        await $(`[name="register"]`).click();

        await expect(await $(`.error`).getText()).toEqual("Invalid name");

        await browser.refresh();
    });

    it("validate admin can not register by keeping fullname of user field empty - #TC_AR_0003", async ()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/register.php");
        const uploadFile = path.resolve("./uploads/photo.jpg");

        await $(`[name="name"]`).setValue("");
        await $(`[name="email"]`).setValue("bob@g.c");
        await $(`[name="username"]`).setValue("bob123456");
        await $(`[name="password"]`).setValue("12345678");
        await $(`[name="c_password"]`).setValue("12345678");
        await $(`[name="photo"]`).setValue(uploadFile);

        await $(`[name="register"]`).click();

        await expect(await $(`.error`).getText()).toEqual("The Name Filed is Required");

        await browser.refresh();
    });

    it("validate admin can not register with invalid email - #TC_AR_0004", async ()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/register.php");
        const uploadFile = path.resolve("./uploads/photo.jpg");

        await $(`[name="name"]`).setValue("Bob Roe");
        await $(`[name="email"]`).setValue("11111");
        await $(`[name="username"]`).setValue("bob123456");
        await $(`[name="password"]`).setValue("12345678");
        await $(`[name="c_password"]`).setValue("12345678");
        await $(`[name="photo"]`).setValue(uploadFile);

        await $(`[name="register"]`).click();

        await expect(await $(`.error`).getText()).toEqual("Invalid email");

        await browser.refresh();
    });


    it("validate admin can not register by keeping email field empty - #TC_AR_0005", async ()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/register.php");
        const uploadFile = path.resolve("./uploads/photo.jpg");

        await $(`[name="name"]`).setValue("Bob Roe");
        await $(`[name="email"]`).setValue("");
        await $(`[name="username"]`).setValue("bob123456");
        await $(`[name="password"]`).setValue("12345678");
        await $(`[name="c_password"]`).setValue("12345678");
        await $(`[name="photo"]`).setValue(uploadFile);

        await $(`[name="register"]`).click();

        await expect(await $(`.error`).getText()).toEqual("The Email Filed is Required");
        
        await browser.refresh();
    });

    it("validate admin can not register with invalid username - #TC_AR_0006", async ()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/register.php");
        const uploadFile = path.resolve("./uploads/photo.jpg");

        await $(`[name="name"]`).setValue("Bob Roe");
        await $(`[name="email"]`).setValue("bob@g.c");
        await $(`[name="username"]`).setValue("#######");
        await $(`[name="password"]`).setValue("12345678");
        await $(`[name="c_password"]`).setValue("12345678");
        await $(`[name="photo"]`).setValue(uploadFile);

        await $(`[name="register"]`).click();

        await expect(await $(`.error`).getText()).toEqual("This username more than 8 charset");
        
        await browser.refresh();
    });

    it("validate admin can not register by keeping username field empty - #TC_AR_0007", async ()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/register.php");
        const uploadFile = path.resolve("./uploads/photo.jpg");

        await $(`[name="name"]`).setValue("Bob Roe");
        await $(`[name="email"]`).setValue("bob@g.c");
        await $(`[name="username"]`).setValue("");
        await $(`[name="password"]`).setValue("12345678");
        await $(`[name="c_password"]`).setValue("12345678");
        await $(`[name="photo"]`).setValue(uploadFile);

        await $(`[name="register"]`).click();

        /* await expect(await $(`.error`).getText()).toEqual("This username more than 8 charset"); */
        
        await browser.refresh();
    });
    

    it("validate admin can not register with invalid password in both field password and confirm password - #TC_AR_0008", async ()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/register.php");
        const uploadFile = path.resolve("./uploads/photo.jpg");

        await $(`[name="name"]`).setValue("Bob Roe");
        await $(`[name="email"]`).setValue("bob@g.c");
        await $(`[name="username"]`).setValue("bob123456");
        await $(`[name="password"]`).setValue("1234567");
        await $(`[name="c_password"]`).setValue("1234567");
        await $(`[name="photo"]`).setValue(uploadFile);

        await $(`[name="register"]`).click();

        await expect(await $$(`.error`)[0].getText()).toEqual("This password more than 8 charset");

        await browser.refresh();
    });

    it("validate admin can not register by keeping empty in both field password and confirm password - #TC_AR_0009", async ()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/register.php");
        const uploadFile = path.resolve("./uploads/photo.jpg");

        await $(`[name="name"]`).setValue("Bob Roe");
        await $(`[name="email"]`).setValue("bob@g.c");
        await $(`[name="username"]`).setValue("bob123456");
        await $(`[name="password"]`).setValue("");
        await $(`[name="c_password"]`).setValue("");
        await $(`[name="photo"]`).setValue(uploadFile);

        await $(`[name="register"]`).click();

        await expect(await $(`.error`).getText()).toEqual("The Password Filed is Required");
        await browser.refresh();
    });

    it("validate admin can not register with valid password and empty confirm  password - #TC_AR_0010", async ()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/register.php");
        const uploadFile = path.resolve("./uploads/photo.jpg");

        await $(`[name="name"]`).setValue("Bob Roe");
        await $(`[name="email"]`).setValue("bob@g.c");
        await $(`[name="username"]`).setValue("bob123456");
        await $(`[name="password"]`).setValue("12345678");
        await $(`[name="c_password"]`).setValue("");
        await $(`[name="photo"]`).setValue(uploadFile);

        await $(`[name="register"]`).click();

        await expect(await $(`.error`).getText()).toEqual("You Typed Wrong Password!");
        await browser.refresh();
    });

    it("validate admin can not register with valid password and mismatched confirm  password - #TC_AR_0011", async ()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/register.php");
        const uploadFile = path.resolve("./uploads/photo.jpg");

        await $(`[name="name"]`).setValue("Bob Roe");
        await $(`[name="email"]`).setValue("bob@g.c");
        await $(`[name="username"]`).setValue("bob123456");
        await $(`[name="password"]`).setValue("12345678");
        await $(`[name="c_password"]`).setValue("123456789");
        await $(`[name="photo"]`).setValue(uploadFile);

        await $(`[name="register"]`).click();

        await expect(await $(`.error`).getText()).toEqual("You Typed Wrong Password!");

        await browser.refresh();
    });

    it("validate admin can not register with invalid file in photo selection - #TC_AR_0012", async ()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/register.php");
        const uploadFile = path.resolve("./uploads/hello.bat");

        await $(`[name="name"]`).setValue("Bob Roe");
        await $(`[name="email"]`).setValue("bob@g.c");
        await $(`[name="username"]`).setValue("bob123456");
        await $(`[name="password"]`).setValue("12345678");
        await $(`[name="c_password"]`).setValue("12345678");
        await $(`[name="photo"]`).setValue(uploadFile);

        await $(`[name="register"]`).click();

        await expect(await $(`.error`).getText()).toEqual("Invalid photo!");

        await browser.refresh();
    });

    it("validate admin can not register without selecting the photo - #TC_AR_0013", async ()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/register.php");
        /* const uploadFile = path.resolve("");
 */
        await $(`[name="name"]`).setValue("Bob Roe");
        await $(`[name="email"]`).setValue("bob@g.c");
        await $(`[name="username"]`).setValue("bob123456");
        await $(`[name="password"]`).setValue("12345678");
        await $(`[name="c_password"]`).setValue("12345678");
        /* await $(`[name="photo"]`).setValue(uploadFile); */

        await $(`[name="register"]`).click();

        
        await expect(await $(`.error`).isExisting() ? await $(`.error`).getText() : "").toEqual("The Photo is Required");
        

        await browser.refresh();
    });

    it("validate admin can go Login page by clicking the Login button - #TC_AR_0014", async ()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/register.php");
        await $('=Login').click();

        await expect($('h1')).toHaveText("Login Users!");

        await browser.refresh();
    });
    
});