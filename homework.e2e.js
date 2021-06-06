import VouchersPage from './vouchers.page'

describe('Voucher Registration Page - excercise 4-2', () => {

    const formData = {
        firstName: 'Petra',
        lastName: 'Ste',
        subscriptionLength: 3,
        birthDate: '21.12.1989',
        email: 'petra@petra.cz'
    }

    beforeEach(() => {
        browser.url('/voucher');
    });

    describe('Form validation', () => {

        it('should validate default form state', () => {
    
            
            expect(VouchersPage.firstNameField).toBeDisplayed();
            expect(VouchersPage.firstNameField).toBeEnabled();
            expect(VouchersPage.firstNameField).toHaveText('');
    
            
            expect(VouchersPage.lastNameField).toBeDisplayed();
            expect(VouchersPage.lastNameField).toBeEnabled();
            expect(VouchersPage.lastNameField).toHaveText('');
    
            
            expect(VouchersPage.subscriptionLenghtField).toHaveAttribute('value', 3);
    
            
            expect(VouchersPage.birthDateField).toHaveAttribute('required');
    
            
            expect(VouchersPage.emailField).toHaveAttribute('type', 'email');
            expect(VouchersPage.emailField).toHaveText('');
    
            
            expect(VouchersPage.submitButton).toHaveText('Vygenerovat kód');
        });
    
    });

    describe('Price by subscription length', () => {

        const testCases = [
            { ...formData, subscriptionLength: 3, price: '1000 Kč', code: 'QWFUYTE5OTAwNDI2M2FhY3' },
            { ...formData, subscriptionLength: 7, price: '950 Kč', code: 'QWFUYTE5OTAwNDI2N2FhY3' },
            { ...formData, subscriptionLength: 14, price: '850 Kč', code: 'QWFUYTE5OTAwNDI2MTRhYW' },
            { ...formData, subscriptionLength: 21, price: '650 Kč', code: 'QWFUYTE5OTAwNDI2MjFhYW' },
        ]

        testCases.forEach( testCase => {

            it('should generate correct price and code for ' + testCase.subscriptionLength + ' month sbscription', () => {
    
                
                VouchersPage.fillForm(testCase.firstName, testCase.lastName, testCase.subscriptionLength, testCase.birthDate, testCase.email);
                VouchersPage.submitForm();
    
                takeScreenshot(testCases.subscriptionLength);
    

                expect(VouchersPage.voucherPrice()).toHaveText(testCase.price);
                expect(VouchersPage.voucherCode()).toHaveText(testCase.code);
            });

        });

    });

    describe('Price by age', () => {

        const testCases = [
            { ...formData, birthDate: '26.4.2000', price: '850 Kč', code: 'QWFUYTIwMDAwNDI2M2FhY3' },
            { ...formData, birthDate: '26.4.1990', price: '1000 Kč', code: 'QWFUYTE5OTAwNDI2M2FhY3' },
            { ...formData, birthDate: '26.4.1960', price: '750 Kč', code: 'QWFUYTE5NjAwNDI2M2FhY3' },
        ]

        testCases.forEach( testCase => {

            it('should generate correct price for birth date ' + testCases.birthDate, () => {

               

                VouchersPage.fillForm(testCase.firstName, testCase.lastName, testCase.subscriptionLength, testCase.birthDate, testCase.email);
                VouchersPage.submitForm();
    
                takeScreenshot(testCases.birthDate);
    
                const voucherCard = $('#voucher');
                expect(voucherCard.$('h3')).toHaveText(testCase.price);
                expect(voucherCard.$('h2')).toHaveText(testCase.code);
            });
        });

    });
    
});

function takeScreenshot(id) {
    browser.saveScreenshot('voucher_subscription_' + id + '_' + browser.capabilities.browserName + '.png');
}