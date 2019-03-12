import { HTTP_hook, is_hook } from './source/hook';

import User, { Admin } from './source/User';

import { spy } from 'sinon';


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
            name:    'test',
            email:   'test@example.com',
            gender:  2,
            avatar:  'http://example.com/test.jpg'
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

    /**
     * @test {Model#forEach}
     * @test {is}
     */
    it('Inherited & Nested Model',  () =>

        (new Admin({email: 'admin@example.com', name: 'admin'})).valueOf()
            .should.be.eql({
                name:    'admin',
                email:   'admin@example.com',
                level:   1,
                author:  {
                    user:  2,
                    post:  2,
                    file:  1,
                    log:   0
                },
                gender:  2,
                avatar:  'http://example.com/admin.jpg'
            })
    );

    /**
     * @test {HTTP}
     * @test {listen}
     * @test {trigger}
     */
    it('Decorator Hook',  () => {

        HTTP_hook.should.match([
            {
                Class:        User,
                method:       'GET',
                path:         '/user',
                contentType:  'application/json'
            },
            {
                Class:        User,
                method:       'POST',
                path:         '/user',
                contentType:  'application/json'
            }
        ]);

        is_hook.should.be.eql(
            key_list.concat(
                'user', 'post', 'file', 'log', 'level', 'author', 'avatar'
            )
        );
    });

    /**
     * @test {Model#observe}
     * @test {Model#set}
     */
    it('Observe key-value changed',  () => {

        const handler = {name: spy()};

        user.observe( handler );

        user.name = 'example', user.name = 'example';

        handler.name.should.be.calledOnce();
        handler.name.should.be.calledWith('example', 'test');
    });
});
