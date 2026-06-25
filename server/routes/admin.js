const Router = require('koa-router');
const ctrl = require('../controllers/adminController');
const auth = require('../middleware/auth');
const antiRepeat = require('../middleware/antiRepeat');

const router = new Router({ prefix: '/api/admin' });

router.get('/captcha', ctrl.getCaptcha);
router.post('/login', ctrl.login);

router.use(auth);
router.use(antiRepeat);

router.post('/logout', ctrl.logout);
router.post('/password', ctrl.changePassword);
router.get('/dashboard', ctrl.dashboard);
router.post('/upload', ctrl.upload);

router.get('/banners', ctrl.bannerList);
router.post('/banners', ctrl.bannerSave);
router.delete('/banners/:id', ctrl.bannerDelete);

router.get('/products', ctrl.productList);
router.post('/products', ctrl.productSave);
router.delete('/products/:id', ctrl.productDelete);
router.get('/products/:productId/files', ctrl.productFiles);
router.post('/product-files', ctrl.productFileSave);
router.delete('/product-files/:id', ctrl.productFileDelete);

router.get('/solutions', ctrl.solutionList);
router.post('/solutions', ctrl.solutionSave);
router.delete('/solutions/:id', ctrl.solutionDelete);

router.get('/cases', ctrl.caseList);
router.post('/cases', ctrl.caseSave);
router.delete('/cases/:id', ctrl.caseDelete);

router.get('/news', ctrl.newsList);
router.post('/news', ctrl.newsSave);
router.delete('/news/:id', ctrl.newsDelete);

router.get('/certificates', ctrl.certList);
router.post('/certificates', ctrl.certSave);
router.delete('/certificates/:id', ctrl.certDelete);

router.get('/partners', ctrl.partnerList);
router.post('/partners', ctrl.partnerSave);
router.delete('/partners/:id', ctrl.partnerDelete);

router.get('/strength', ctrl.strengthList);
router.post('/strength', ctrl.strengthSave);

router.get('/about', ctrl.aboutGet);
router.post('/about', ctrl.aboutSave);

router.get('/config', ctrl.configGet);
router.post('/config', ctrl.configSave);

router.get('/advantages', ctrl.advantageList);
router.post('/advantages', ctrl.advantageSave);
router.delete('/advantages/:id', ctrl.advantageDelete);

router.get('/logs', ctrl.logList);

module.exports = router;
