/// <reference types="Cypress" />

import CreateFakeDataHelper from '../../helpers/randomTags';

const mainPage = Cypress.env('mainPage');
const offersSubPage = Cypress.env('offersSubPage');

const accessTokenCookieName = 'access_token';

const emailFieldId = '#admin_email';
const passwordFieldId = '#admin_password';
const buttonClass = '.button.submit-sign-in';

const emailAddress = 'padek123@email.ghostinspector.com';
const password = 'Polska1!';

describe('Recruitment task', () => {

    before(() => {
        cy.visit(mainPage);
        cy.viewport(1920, 1080)

        cy.get(emailFieldId).type(emailAddress);
        cy.get(passwordFieldId).type(password);
        cy.get(buttonClass).click();
    })

    beforeEach(() => {
        Cypress.Cookies.preserveOnce(accessTokenCookieName);
    })

    it('Create a new job offer', () => {
        cy.visit(offersSubPage);

        cy.contains('New job').click();

        cy.get('.form-field__input-wrapper').within(() => {
            cy.get('[formcontrolname="title"]').within(() => {
                cy.get('[placeholder="Type job title"]').type('Quality Assurance role');
            })
        });

        cy.get('.underlined.has-clear-button.ng-star-inserted').within(() => {
            cy.get('[placeholder="Select"]').click();
        })

        cy.get('.container-dropdown.context-alt').within(() => {
            cy.get('.text__slot').contains('Product').click();
        })

        cy.get('.redactor-styles.redactor-placeholder.redactor-in.redactor-in-0').type('Job description should be filled in - quality, quality, quality');

        cy.get('.redactor-styles.redactor-placeholder.redactor-in.redactor-in-1').type('Job requirements should be also filled in - so here is the text');

        cy.get('[formcontrolname="countryCode"]').within(() => {
            cy.get('[variant="underlined has-dropdown select-input"]').click();
        });

        cy.get('[class="ng-star-inserted"]').contains('Poland').click();

        cy.get('[formcontrolname="stateCode"]').within(() => {
            cy.get('[variant="underlined has-dropdown select-input"]').click();
        })

        cy.get('[class="ng-star-inserted"]').contains('Lubuskie').click();

        cy.get('[formcontrolname="city"]').type('Nowe Miasteczko');

        cy.get('[formcontrolname="postalCode"]').type('67-124');

        cy.get('[class="only-icon outline small-x has-icon ng-star-inserted"]').click();

        cy.get('.theme-default.divider.ng-star-inserted').contains('Senior').click();

        let tagName = CreateFakeDataHelper.getTagRandomName();

        cy.get('[class="form-field__input-wrapper"]').within(() => {
            cy.get('[placeholder="Search tags..."]').type(tagName);
        })

        cy.get('[class="ng-star-inserted"]').within(() => {
            cy.get('[class="text__slot"]').within(() => {
                cy.get('[class="special-item highlight-value clickable ng-star-inserted"]').contains('Create new tag').click();
            })
        });

        cy.get('.details-wrap').contains('Job details ').scrollIntoView();

        cy.get('[formcontrolname="employmentType"]').within(() => {
            cy.get('[placeholder="Select"]').click({
                force: true
            });
        })

        cy.get('[class="item ng-star-inserted"]').contains('Temporary').click();

        cy.get('[formcontrolname="category"]').within(() => {
            cy.get('[placeholder="Select"]').click({
                force: true
            });
        })

        cy.get('[class="item ng-star-inserted"]').contains('Accounting').click();

        cy.get('[formcontrolname="education"]').within(() => {
            cy.get('[placeholder="Select"]').click({
                force: true
            });
        })

        cy.get('[class="item ng-star-inserted"]').contains('Certification').click();

        cy.get('[formcontrolname="experience"]').within(() => {
            cy.get('[placeholder="Select"]').click({
                force: true
            });
        })

        cy.get('[class="item ng-star-inserted"]').contains('Entry level').click({
            force: true
        });

        cy.get('[formcontrolname="minHours"]').within(() => {
            cy.get('[type="text"]').click({
                force: true
            });
        })

        cy.get('[formcontrolname="minHours"]').within(() => {
            cy.get('[type="text"]').type('25');
        })

        cy.get('[formcontrolname="maxHours"]').within(() => {
            cy.get('[type="text"]').click({
                force: true
            }).type('60');
        })

        cy.get('[class="text-content"]').contains('Application form').click({
            force: true
        });
    })
})