describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"))

    it("Fills all the text input fields", () => {
        const firstName = "Gabriel";
        const lastName = "Nascimento";


        cy.get("#first-name").type(firstName); //identify elements through CSS SELECTORS
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("example@mail.com")
        cy.get("#requests").type("like to eat lot of meat")
        cy.get("#signature").type(`${firstName} ${lastName}`)
    });

    it("Select two tickets", () => {
        cy.get("#ticket-quantity").select("2"); //iterating with select types
    });


    it("Select 'vip' ticket type", () => {
        cy.get("#vip").check(); ///work with radio buttons
    })


    it("Selects 'social media' checkbox", () => {
        cy.get("#social-media").check();
    });

    it("selects 'friend', and 'publication', then uncheck 'friend'", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    });


    it("has 'TICKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX")
    });

    //work with Assertions
    it("alerts on invalid email", () => {
        cy.get("#email").as("mail")//define alias for css selector
            .type("example-mail.com");

        cy.get("#email.invalid").should("exist");

        cy.get("@mail").clear()
            .type("example@mail.com")

        cy.get("#email.invalid").should("not.exist");
    });

    it("fills and reset the fomr", () => {
        const firstName = "John";
        const lastName = "Doe";
        const fullName = `${firstName} ${lastName}`;

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("johndoe@mail.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#requests").type("I would like lot of pizzas!");

        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets.`
        )

        cy.get("#agree").click();
        cy.get("#signature").type(`${fullName}`);

        cy.get("button[type='submit']").as("submitButton")
            .should("not.be.disabled")

        cy.get("button[type='reset']").click();

        cy.get("@submitButton").should("be.disabled");


    });

    it.only("Fill mandatory fields", () => {
        const customer = {
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@mail.com"
        };

        cy.fillMandatoryField(customer);

        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled")

        cy.get("#agree").uncheck();

        cy.get("@submitButton").should("be.disabled");
    })

});