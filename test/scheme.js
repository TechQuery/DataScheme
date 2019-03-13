import Server from './source/Server';


const server = new Server();


describe('Scheme validator',  () => {
    /**
     * @test {IPv4}
     */
    it('IP v4',  () =>
        (() => server.IPv4 = '192.168.0.0x100').should.throw(
            new SyntaxError('"IPv4" of Server should be an IPv4 address')
        )
    );

    /**
     * @test {IPv6}
     */
    it('IP v6',  () => {

        (() => server.IPv6 = '2001:DB8:2de::10000').should.throw(
            new SyntaxError('"IPv6" of Server should be an IPv6 address')
        );

        (() => server.IPv6 = '::ffff:192.168.0.256').should.throw(
            new SyntaxError('"IPv6" of Server should be an IPv6 address')
        );
    });

    /**
     * @test {HTTP_URL}
     */
    it('HTTP URL',  () =>
        (() => server.URL = 'http://test:test@192.168.0.255:65536').should.throw(
            new URIError('"URL" of Server should be a HTTP URL')
        )
    );
});
