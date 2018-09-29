import DataScheme, { schemeOf, Range } from '../source';


describe('Scheme Helper',  () => {
    /**
     * @test {Range}
     */
    it('Number range',  () => {

        @schemeOf({
            version:  Range(1, 9, 2)
        })
        class App extends DataScheme { }

        const app = new App();

        (() => app.version = 4).should.throw(
            '"version" of App should be a Range(1,9,2)'
        );
    });
});
