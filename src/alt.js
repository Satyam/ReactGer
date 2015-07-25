var Alt = require('alt');
var alt = new Alt();
alt.pending = 0;
var done = false;
if (typeof window !== 'undefined' && !done) {
	done = true;
	alt.bootstrap(document.getElementById('altSnapshot').innerHTML);
}
export default alt;
