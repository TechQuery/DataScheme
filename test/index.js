import User from './source/User';


const key_list = [
    'name', 'email', 'phone', 'gender', 'birthYear', 'avatar', 'URL', 'description'
];

var user;

describe('Scheme class',  () => {
    /**
     * @test {mapGetter}
     */
    it('Getter / Setter pairs',  () =>

        Object.entries( Object.getOwnPropertyDescriptors( User.prototype ) )
            .filter(item  =>  item[1].set && item[1].get)
            .map(([ key ])  =>  key)
            .should.be.eql( key_list )
    );

    /**
     * @test {is}
     */
    it('Required field',  () =>

        (() => new User()).should.throw(
            new TypeError('"name" of User should match /^[\\w-]{3,20}$/')
        )
    );

    /**
     * @test {is}
     * @test {Model#forEach}
     */
    it('Default value',  () => {

        user = new User({email: 'test@example.com', name: 'test'});

        user.valueOf().should.be.eql({
            name: 'test',
            email: 'test@example.com',
            gender: 2,
            avatar: 'http://example.com/test.jpg'
        });
    });

    /**
     * @test {is}
     */
    it('Basic Data type',  () =>

        (() => user.description = 1).should.throw(
            new TypeError('"description" of User should be String')
        )
    );

    /**
     * @test {Range}
     */
    it('Number range',  () =>

        (() => user.birthYear = 1898).should.throw(
            new RangeError(
                '"birthYear" of User should be in range of [1900, Infinity] with step 1'
            )
        )
    );
});
