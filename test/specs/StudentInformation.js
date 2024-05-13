import {$} from "@wdio/globals";

describe("validate student can check their enrollment - #TS_SES_0001", ()=>{
    it("validate students can view their information with valid class and roll - #TC_SI_0001", async()=>{
        await browser.url(`http://localhost/project/student-php-enroolment/`);
        await browser.maximizeWindow();
        
        let selectBox = await $(`[name="choose"]`);
        await selectBox.selectByAttribute('value', '1st');
        await $(`[id="roll"]`).setValue("444433");

        await $(`[name="showinfo"]`).click();
        await expect(await $(`//td[text()="444433"]`).isExisting()).toBeTruthy();
    });

    it("validate students can not view their information without selecting the class - #TC_SI_0002", async()=>{
        await browser.url(`http://localhost/project/student-php-enroolment/`);
        await browser.maximizeWindow();
        
        
        await $(`[id="roll"]`).setValue("444433");

        await $(`[name="showinfo"]`).click();
        await expect(await browser.getAlertText()).toEqual("Data Not Found!");
        await browser.acceptAlert();
    }); 

    it("validate students can not view their information with invalid roll - #TC_SI_0003", async()=>{
        await browser.url(`http://localhost/project/student-php-enroolment/`);
        await browser.maximizeWindow();
        
        
        let selectBox = await $(`[name="choose"]`);
        await selectBox.selectByAttribute('value', '1st');
        await $(`[id="roll"]`).setValue("444434");

        await $(`[name="showinfo"]`).click();
        await expect(await $(`//p[text()="Your Input Doesn't Match!"]`)).toExist();
    });

    it.only("validate students can not view their information by keeping roll number field empty - #TC_SI_0004", async()=>{
        await browser.url(`http://localhost/project/student-php-enroolment/`);
        await browser.maximizeWindow();
        
        
        let selectBox = await $(`[name="choose"]`);
        await selectBox.selectByAttribute('value', '1st');

        await $(`[name="showinfo"]`).click();
        await expect(await browser.getAlertText()).toEqual("Data Not Found!");
        await browser.acceptAlert();
    });

    afterEach("Refresh the page", async()=>{
        await browser.refresh();
    });
});