import Model, { mapGetter, is, Range, Email, Phone, URI } from '../../source';


@mapGetter
export default  class User extends Model {

    @is(/^[\w-]{3,20}$/, '')
    set name(value) {  this.set('name', value);  }

    @is(Email, '')
    set email(value) {  this.set('email', value);  }

    @is( Phone )
    set phone(value) {  this.set('phone', value);  }

    @is([0, 1, 2],  2)
    set gender(value) {  this.set('gender', value);  }

    @is(Range( 1900 ))
    set birthYear(value) {  this.set('birthYear', value);  }

    @is(URI, 'http://example.com/test.jpg')
    set avatar(value) {  this.set('avatar', value);  }

    @is( URI )
    set URL(value) {  this.set('URL', value);  }

    @is( String )
    set description(value) {  this.set('description', value);  }
}


@mapGetter
export class Author extends Model {

    @is(Range(0, 3), 2)
    set user(value) {  this.set('user', value);  }

    @is(Range(0, 3), 2)
    set post(value) {  this.set('post', value);  }

    @is(Range(0, 3), 1)
    set file(value) {  this.set('file', value);  }

    @is(Range(0, 3), 0)
    set log(value) {  this.set('log', value);  }
}


@mapGetter
export class Admin extends User {

    @is(Range(0), 1)
    set level(value) {  this.set('level', value);  }

    @is(Author, { })
    set author(value) {  this.set('author', value);  }

    @is(URI, 'http://example.com/admin.jpg')
    set avatar(value) {  this.set('avatar', value);  }
}
