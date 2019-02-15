import Model, { mapGetter, is, Range, Email, Phone, URL } from '../../source';


@mapGetter
export default  class User extends Model {

    constructor(data) {  super(data);  }

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

    @is(URL, 'http://example.com/test.jpg')
    set avatar(value) {  this.set('avatar', value);  }

    @is( URL )
    set URL(value) {  this.set('URL', value);  }

    @is( String )
    set description(value) {  this.set('description', value);  }
}
