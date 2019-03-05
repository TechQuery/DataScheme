import { listen } from '../../source';


export const HTTP_hook = [ ], is_hook = [ ];


listen('HTTP',  data => HTTP_hook.push( data ));

listen('is',  ({ key }) => is_hook.push( key ));
