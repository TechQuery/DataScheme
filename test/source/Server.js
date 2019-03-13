import Model, { mapGetter, is, IPv4, IPv6, HTTP_URL } from '../../source';


@mapGetter
export default  class Server extends Model {

    @is( IPv4 )
    set IPv4(value) {  this.set('IPv4', value);  }

    @is( IPv6 )
    set IPv6(value) {  this.set('IPv6', value);  }

    @is( HTTP_URL )
    set URL(value) {  this.set('URL', value);  }
}
