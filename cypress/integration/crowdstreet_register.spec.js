describe("Testing crowdstreet registration", () => {
    //Random test data for registration
    const firstName = cy.faker.name.firstName()
    const lastName = cy.faker.name.lastName()
    const email = firstName.toLowerCase() + lastName.toLowerCase() + "@fakeemail.com"

    it.only("Register new user to Crowdstreet test site", () => {
        //Navigate to the crowdstreet test site
        cy.visit("https://test.crowdstreet.com/")

        //Entering data to register then submit
        cy.get('.tablet-menu > .join-button').click()
        cy.url().should('eq', 'https://test.crowdstreet.com/invexp/accounts/create-account/')
        cy.get('#create_account_email').type(email)
        cy.get('.-left > .ui > input').type(firstName)
        cy.get(':nth-child(4) > :nth-child(2) > .ui > input').type(lastName)
        cy.get('.password-input-container > .input-container > .ui > input').type("P@ssword1")
        cy.get('.password-confirm-input > .ui > input').type("P@ssword1")
        cy.get(':nth-child(7) > .ui > input').type(cy.faker.name.firstName())
        cy.get(':nth-child(9) > .ui > input').type(cy.faker.phone.phoneNumber())
        cy.get(':nth-child(11) > .ui > input').type(cy.faker.address.streetName())
        cy.get(':nth-child(12) > .ui > input').type(cy.faker.address.city())
        cy.get('.-left > .css-sb5ri3 > .ui > .dropdown').click() 
        cy.xpath("//div/span[.='Oregon (OR)']").click()
        cy.get(':nth-child(13) > :nth-child(2) > .ui > input').type("97209")
        cy.get(':nth-child(1) > ._radio_e1a40').click()
        cy.get(':nth-child(1) > ._field_1fb41 > ._check_1fb41').click()
        cy.get(':nth-child(2) > ._field_1fb41 > ._check_1fb41').click()
        cy.solveGoogleReCAPTCHA()
        cy.get('.account-creation-form-container > ._flat_d2f0c').click()

        //Asserting the name on the splash page
        cy.get('.title').should('contain', firstName)
    })
})