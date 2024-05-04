import {$} from "@wdio/globals";

describe("validate login of admin - #TS_SES_0002", ()=>{


    it("validate admin can login with valid credentials - #TC_AL_0001", async()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/login.php");

        await $(`[id="inputEmail3"]`).setValue("john123456");
        await $(`[id="inputPassword3"]`).setValue("12345678");

        await $(`[name="login"]`).click();
        await expect(await browser.getTitle()).toEqual("Admin Deshboard");
        await browser.maximizeWindow();

        await browser.reloadSession();
    }) 

    it("validate admin can not login with invalid username - #TC_AL_0002", async()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/login.php");

        await $(`[id="inputEmail3"]`).setValue("xyz999");
        await $(`[id="inputPassword3"]`).setValue("12345678");

        await $(`[name="login"]`).click();
        await expect(await browser.getTitle()).toEqual("Hello, world!");
    })

    it("validate admin can not login with empty username field - #TC_AL_0003", async()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/login.php");

        await $(`[id="inputEmail3"]`).setValue("");
        await $(`[id="inputPassword3"]`).setValue("12345678");

        await $(`[name="login"]`).click();
        await expect(await $(`//label[text()="Username Is Required!"]`)).toExist();
    })

    it("validate admin can not login with invalid password - #TC_AL_0004", async()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/login.php");

        await $(`[id="inputEmail3"]`).setValue("john123456");
        await $(`[id="inputPassword3"]`).setValue("pppppppp");

        await $(`[name="login"]`).click();
        await expect(await $(`[role="alert"]`)).toHaveText("This password Wrong!");
    })

    it("validate admin can not login with empty password field - #TC_AL_0005", async()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/login.php");

        await $(`[id="inputEmail3"]`).setValue("john123456");
        await $(`[id="inputPassword3"]`).setValue("");

        await $(`[name="login"]`).click();
        await expect(await $(`//label[text()="Password Is Required!"]`)).toExist();
    })

    it("validate admin can go register page from login page - #TC_AL_0006", async()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/login.php");

        await $(`*=Register`).click();
        await expect(await $(`//h1[text()="Register Users!"]`)).toExist();
    })

    it("validate after login and without logout admin can not access login page - #TC_AL_0007", async()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/login.php");

        await $(`[id="inputEmail3"]`).setValue("john123456");
        await $(`[id="inputPassword3"]`).setValue("12345678");

        await $(`[name="login"]`).click();
        await expect(await browser.getTitle()).toEqual("Admin Deshboard");
        await browser.maximizeWindow();

        await browser.url("http://localhost/project/student-php-enroolment/admin/login.php");
        await expect(await browser.getTitle()).toEqual("Admin Deshboard");
        await browser.reloadSession();
    })

    it("validate clicking on logout button admin directs to login page - #TC_AL_0008", async()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/login.php");

        await $(`[id="inputEmail3"]`).setValue("john123456");
        await $(`[id="inputPassword3"]`).setValue("12345678");

        await $(`[name="login"]`).click();
        await expect(await browser.getTitle()).toEqual("Admin Deshboard");
        await browser.maximizeWindow();

        await $(`[href="logout.php"]`).click();
        await expect(await $(`//h1[text()="Login Users!"]`)).toExist();
        await browser.reloadSession();
    })

    it("validate user can not access the dashboard with its url without login - #TC_AL_0009", async()=>{
        await browser.url("http://localhost/project/student-php-enroolment/admin/index.php");
        await expect(await $(`//h1[text()="Login Users!"]`)).toExist();
    })


    
})