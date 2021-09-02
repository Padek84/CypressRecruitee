/// <reference types="Cypress" />

import CreateFakeDataHelper from '../../helpers/randomTags';

const loginPage = Cypress.env('loginPage');
const mainPage = Cypress.env('mainPage');
const offersSubPage = Cypress.env('offersSubPage');

const accessTokenCookieName = 'access_token';

const emailFieldId = '#admin_email';
const passwordFieldId = '#admin_password';
const buttonClass = '.button.submit-sign-in';

const emailAddress = 'padek123@email.ghostinspector.com';
const password = 'Polska1!';

const wrongEmailAddress = 'badaddress@malpa.pl';
const wrongPassword = 'notExisitngPassword';

let tagName = CreateFakeDataHelper.getTagRandomName();

describe('Recruitment task', () => {

    beforeEach(() => {
        Cypress.Cookies.preserveOnce(accessTokenCookieName);
    })

    it('WHEN user fill in the incorrect email and password THEN the error message will be displayed', () => {
        // Arrange
        cy.visit(loginPage);
        cy.get(emailFieldId).type(wrongEmailAddress);
        cy.get(passwordFieldId).type(wrongPassword);

        // Act
        cy.get(buttonClass).click();

        // Assert
        cy.get('.alert.alert-danger').within(() => {
            cy.get('.content').should('contain', 'Invalid email and password combination.');
        })
    })

    it('WHEN user fill in the correct email and password THEN should be logged in succesfully', () => {
        // Arrange
        cy.visit(loginPage);
        cy.get(emailFieldId).type(emailAddress);
        cy.get(passwordFieldId).type(password);

        // Act
        cy.get(buttonClass).click();

        // Assert
        cy.url().should('eq', mainPage);
    })

    it('WHEN user go to the Jobs page THEN the page are opened and offers displayed', () => {
        // Arrange
        cy.visit(mainPage + offersSubPage);

        // Act
        // Assert
        cy.url().should('eq', mainPage + offersSubPage);
        cy.contains('New job').should('be.visible');
    });

    it('WHEN user click on New Job button THEN Create new Job view should be displayed', () => {
        // Arrange
        cy.contains('New job').click();

        // Act
        // Assert
        cy.url().should('eq', mainPage + '#/offer/new');
        cy.get('.offer-posting-form.ng-untouched.ng-pristine.ng-invalid').should('be.visible');
    })

    it('WHEN user fill in the Job title field THEN the filled in text should be visible', () => {
        // Arrange        
        // Act
        cy.get('.form-field__input-wrapper').within(() => {
            cy.get('[formcontrolname="title"]').within(() => {
                cy.get('[placeholder="Type job title"]').type('Quality Assurance role');
            })
        });

        // Assert
        cy.get('.form-field__input-wrapper').within(() => {
            cy.get('[formcontrolname="title"]').within(() => {
                cy.get('[placeholder="Type job title"]').invoke('val').should('contain', 'Quality Assurance role');
            })
        });
    })

    it('WHEN the select department will be clicked THEN dropdown should be visible', () => {
        // Arrange
        // Act
        cy.get('.underlined.has-clear-button.ng-star-inserted').within(() => {
            cy.get('[placeholder="Select"]').click();
        })

        // Assert
        cy.get('.container-dropdown.context-alt').within(() => {
            cy.get('.text__slot').should('be.visible');
        })
    })

    it('WHEN the department is chosen THEN the dropdown window is not visible anymore and proper value in the field', () => {
        // Arrange
        // Act
        cy.get('.container-dropdown.context-alt').within(() => {
            cy.get('.text__slot').contains('Product').click();
        })
        // Assert
        cy.get('.container-dropdown.context-alt').should('not.exist')
        cy.get('.underlined.has-clear-button.ng-star-inserted').within(() => {
            cy.get('[placeholder="Select"]').invoke('val').should('contain', 'Product');
        })
    })

    it('WHEN the Job description is filled in THEN the correct text is visible', () => {
        // Arrange
        // Act
        cy.get('.redactor-styles.redactor-placeholder.redactor-in.redactor-in-0').type('Job description should be filled in - quality, quality, quality');

        // Assert
        cy.get('p').contains('Job description should be filled in - quality, quality, quality');
    })

    it('WHEN the Job requirements is filled in THEN the correct text is visible', () => {
        // Arrange
        // Act
        cy.get('.redactor-styles.redactor-placeholder.redactor-in.redactor-in-1').type('Job requirements should be also filled in - so here is the text');

        // Assert
        cy.get('p').contains('Job requirements should be also filled in - so here is the text');
    })

    it('WHEN the Country placeholder is clicked THEN dropdown is visible', () => {
        // Arrange
        // Act
        cy.get('[formcontrolname="countryCode"]').within(() => {
            cy.get('[variant="underlined has-dropdown select-input"]').click();
        });

        // Assert
        cy.get('[class="ng-star-inserted"]').should('be.visible');
    })

    it('WHEN the Country is chosen THEN the proper country is in the field', () => {
        // Arrange
        // Act
        cy.get('[class="ng-star-inserted"]').contains('Poland').click();

        // Assert        
        cy.get('[formcontrolname="countryCode"]').within(() => {
            cy.get('[placeholder="Select country"]').invoke('val').should('contain', 'Poland');
        });
    })

    it('WHEN the State/Region placeholder is clicked THEN dropdown is visible', () => {
        // Arrange
        // Act

        cy.get('[formcontrolname="stateCode"]').within(() => {
            cy.get('[variant="underlined has-dropdown select-input"]').click();
        })

        // Assert
        cy.get('[class="ng-star-inserted"]').should('be.visible');
    })

    it('WHEN the State/Region is chosen THEN the dropdown disappear and the proper State/Region is in the field', () => {
        // Arrange
        // Act
        cy.get('[class="ng-star-inserted"]').contains('Lubuskie').click();

        // Assert
        cy.get('[formcontrolname="stateCode"]').within(() => {
            cy.get('[placeholder="Select state or region"]').invoke('val').should('contain', 'Lubuskie');
        })
    })

    it('WHEN the city is filled in THEN the proper city is displayed', () => {
        // Arrange
        // Act
        cy.get('[formcontrolname="city"]').type('Nowe Miasteczko');

        // Assert
        cy.get('[formcontrolname="city"]').within(() => {
            cy.get('[placeholder="Type city"]').invoke('val').should('contain', 'Nowe Miasteczko')
        });
    })

    it('WHEN the zipcode is filled in THEN the proper zipcode is displayed', () => {
        // Arrange
        // Act
        cy.get('[formcontrolname="postalCode"]').type('67-124');

        // Assert
        cy.get('[formcontrolname="postalCode"]').within(() => {
            cy.get('[placeholder="Type ZIP code"]').invoke('val').should('contain', '67-124');
        })
    })

    it('WHEN the user clicks on + button THEN dropdown list is displayed', () => {
        // Arrange
        // Act
        cy.get('[class="only-icon outline small-x has-icon ng-star-inserted"]').click();

        // Assert
        cy.get('.theme-default.divider.ng-star-inserted').should('be.visible')
    })

    it('WHEN the tag is chosen THEN the dropdown is still visible and proper tag in the field', () => {
        // Arrange
        // Act
        cy.get('.theme-default.divider.ng-star-inserted').contains('Senior').click();

        // Assert
        cy.get('.theme-default.divider.ng-star-inserted').should('be.visible');
    })

    it('WHEN user checks the dropdown THEN dropdown list is displayed again and Create new tag not exist', () => {
        // Arrange
        // Act
        // Assert
        cy.get('.theme-default.divider.ng-star-inserted').should('be.visible');
        cy.get('[class="ng-star-inserted"]').within(() => {
            cy.get('[class="text__slot"]').within(() => {
                cy.get('[class="special-item highlight-value clickable ng-star-inserted"]').should('not.exist');
            })
        });
    })

    it('WHEN the new tag is typed THEN the create new tag option can be clicked', () => {
        // Arrange

        // Act
        cy.get('[class="form-field__input-wrapper"]').within(() => {
            cy.get('[placeholder="Search tags..."]').type(tagName);
        })

        cy.wait(1000);

        cy.get('[class="ng-star-inserted"]').within(() => {
            cy.get('[class="text__slot"]').contains('Create new tag').click();
        });

        cy.wait(500);

        cy.get('.line.ng-star-inserted').first().click({
            force: true
        });
    })

    it('WHEN user clicks on Select employment type THEN the placeholder is displayed', () => {
        // Arrange
        cy.get('.details-wrap').contains('Job details').scrollIntoView();

        // Act
        cy.get('[formcontrolname="employmentType"]').find('[placeholder="Select"]').click({
            force: true
        });

        // Assert
        cy.get('[class="item ng-star-inserted"]').should('be.visible');
    })

    it('WHEN the value is chosen THEN the proper value is in the field', () => {
        // Arrange
        // Act
        cy.get('[class="item ng-star-inserted"]').contains('Temporary').click({
            force: true
        });

        // Assert
        cy.get('[class="item ng-star-inserted"]').should('not.exist');
        cy.get('[formcontrolname="employmentType"]').within(() => {
            cy.get('[placeholder="Select"]').invoke('val').should('contain', 'Temporary')
        })
    })

    it('WHEN select category placeholder is clicked THEN dropdown lis displayed', () => {
        // Arrange
        // Act
        cy.get('[formcontrolname="category"]').within(() => {
            cy.get('[placeholder="Select"]').click({
                force: true
            });
        })

        // Assert
        cy.get('[class="item ng-star-inserted"]').should('be.visible')
    })

    it('WHEN the value is chosen THEN the dropdown is not visible and proper value in the field', () => {
        // Arrange
        // Act
        cy.get('[class="item ng-star-inserted"]').contains('Accounting').click();

        // Assert
        cy.get('[class="item ng-star-inserted"]').should('not.exist');
        cy.get('[formcontrolname="category"]').within(() => {
            cy.get('[placeholder="Select"]').invoke('val').should('contain', 'Accounting')
        })
    })

    it('WHEN the select required education placeholder is clicked THEN the dropdown is displayed', () => {
        // Arrange
        // Act
        cy.get('[formcontrolname="education"]').within(() => {
            cy.get('[placeholder="Select"]').click({
                force: true
            });
        })

        // Assert
        cy.get('[class="item ng-star-inserted"]').contains('Certification').should('be.visible');
    })

    it('WHEN the value is chosen THEN the dropdown is not visible anymore and the proper value in the field', () => {
        // Arrange
        // Act
        cy.get('[class="item ng-star-inserted"]').contains('Certification').click();

        // Assert        
        cy.get('[formcontrolname="education"]').within(() => {
            cy.get('[placeholder="Select"]').invoke('val').should('contain', 'Certification');
        })
    })

    it('WHEN the select required experiance placeholder is clicked THEN the dropdown is displayed', () => {
        // Arrange
        // Act
        cy.get('[formcontrolname="experience"]').within(() => {
            cy.get('[placeholder="Select"]').click({
                force: true
            });
        })

        // Assert
        cy.get('[class="item ng-star-inserted"]').contains('Entry level').should('be.visible');
    })

    it('WHEN the value is chosen THEN the dropdown is not visible anymore and the proper value in the field', () => {
        // Arrange
        // Act
        cy.get('[class="item ng-star-inserted"]').contains('Entry level').click({
            force: true
        });

        // Assert        
        cy.get('[formcontrolname="experience"]').within(() => {
            cy.get('[placeholder="Select"]').invoke('val').should('contain', 'Entry level');
        })
    })

    it('WHEN the hours per week fields are filled in THEN the proper value are there', () => {
        // Arrange
        // Act
        cy.get('[formcontrolname="minHours"]').within(() => {
            cy.get('[type="text"]').click({
                force: true
            }).type('25');
        })

        cy.get('[formcontrolname="maxHours"]').within(() => {
            cy.get('[type="text"]').click({
                force: true
            }).type('60');
        })

        // Assert
        cy.get('[formcontrolname="minHours"]').within(() => {
            cy.get('[type="text"]').invoke('val').should('contain', '25');
        });

        cy.get('[formcontrolname="maxHours"]').within(() => {
            cy.get('[type="text"]').invoke('val').should('contain', '60');
        });
    })

    it('WHEN the Application form button is clicked THEN the application is added succesfully', () => {
        // Arrange
        // Act
        cy.get('[class="text-content"]').contains('Application form').click({
            force: true
        });

        // Assert
        cy.url().should('include', '/edit/application_form');
        cy.get('.message-wrap.information').should('contain', 'Job saved as draft. Publish it to start receiving candidates.');
    })
})