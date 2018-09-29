import DataScheme, { schemeOf, Email, Phone } from '../source';


describe('Core',  () => {
    /**
     * @test {DataScheme.check}
     */
    describe('Check schemes',  () => {

        it(
            'Global Type',
            ()  =>  DataScheme.check(Number, 1).should.be.true()
        );

        it(
            'Custom Callback',
            ()  =>  DataScheme.check(value => !value,  0).should.be.true()
        );

        it(
            'Regular Expression',
            ()  =>  DataScheme.check(/test/, 'example').should.be.false()
        );
    });

    /**
     * @test {schemeOf}
     */
    describe('Decorate classes',  () => {

        it('Base class',  () => {

            const data = new DataScheme();

            (() => data.id = '').should.throw(
                '"id" of DataScheme should be a Number'
            );
        });

        it('Implementation class',  () => {

            @schemeOf({
                email:  Email,
                phone:  Phone
            })
            class User extends DataScheme { }

            const user = new User();

            (()  =>  (user.name = 'TechQuery', user.email = '@gmail.com'))
                .should.throw(
                    '"email" of User should be a /.+?@(.+?\\.){1,}\\w+/'
                );
        });
    });
});
