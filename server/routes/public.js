const Router = require('koa-router');
const ctrl = require('../controllers/publicController');

const router = new Router({ prefix: '/api/public' });

router.get('/home', ctrl.getHomeData);
router.get('/banners', ctrl.getBanners);
router.get('/advantages', ctrl.getHomeAdvantages);
router.get('/products', ctrl.getProducts);
router.get('/products/:id', ctrl.getProductDetail);
router.get('/solutions', ctrl.getSolutions);
router.get('/solutions/:id', ctrl.getSolutionDetail);
router.get('/cases', ctrl.getCases);
router.get('/cases/:id', ctrl.getCaseDetail);
router.get('/news', ctrl.getNews);
router.get('/news/:id', ctrl.getNewsDetail);
router.get('/certificates', ctrl.getCertificates);
router.get('/partners', ctrl.getPartners);
router.get('/strength', ctrl.getCompanyStrength);
router.get('/about', ctrl.getAbout);
router.get('/config', ctrl.getWebsiteConfig);
router.get('/download/:id', ctrl.downloadFile);

module.exports = router;
