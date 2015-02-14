return;

var _ = require('lodash');
 
var EMA = require('../methods/indicators/EMA.js');
var DEMA = require('../methods/indicators/DEMA.js');
var MACD = require('../methods/indicators/MACD.js');
var PPO = require('../methods/indicators/PPO.js');

var test = {};

// Fake input prices to verify all indicators 
// are working correctly by comparing fresh
// calculated results to pre calculated results.

// The precalculated results are already compared 
// to MS Excel results, more info here:
// 
// https://github.com/askmike/gekko/issues/161

var prices = [81, 24, 75, 21, 34, 25, 72, 92, 99, 2, 86, 80, 76, 8, 87, 75, 32, 65, 41, 9, 13, 26, 56, 28, 65, 58, 17, 90, 87, 86, 99, 3, 70, 1, 27, 9, 92, 68, 9];

// EMA results

var verified_ema10results = [81,70.63636363636363,71.4297520661157,62.26070623591284,57.12239601120141,51.28196037280115,55.04887666865549,61.767262728899944,68.53685132364541,56.43924199207351,61.81392526624197,65.12048430874341,67.09857807079005,56.35338205791913,61.92549441102474,64.30267724538388,58.42946320076862,59.624106255174325,56.2379051178699,47.649195096439,41.349341442541004,38.55855208935173,41.72972443674232,39.233410902789174,43.91824528410023,46.47856432335473,41.118825355472055,50.00631165447713,56.73243680820856,62.053811933988825,68.77130067326358,56.81288236903384,59.21054012011859,48.626805552824294,44.69465908867441,38.204721072551784,47.985680877542364,51.62464799071648,43.874711992404386];
var verified_ema12results = [81,72.23076923076923,72.65680473372781,64.709604005462,59.98504954308323,54.602734228762735,57.27923665510693,62.620892554321244,68.2176783151949,58.030343189780304,62.33336731442949,65.05131080451726,66.73572452689922,57.69945921506857,62.20723472044264,64.17535245575915,59.2252982317962,60.11371388844294,57.173142520990176,49.761889825453224,44.10621446769119,41.320643011123316,43.57900562479665,41.182235528674084,44.84650698580115,46.87012129567789,42.27471801941975,49.61706909335518,55.368289232839,60.080860120094535,66.06842010161846,56.365586239831,58.46318835678008,49.62269784035237,46.14228278799047,40.42808543599194,48.36222613814702,51.383422116893634,44.86289563737154];
var verified_ema26results = [81,76.77777777777777,76.64609053497942,72.52415790275873,69.67051657662846,66.36158942280413,66.77924946555937,68.64745320885127,70.89579000819562,65.79239815573669,67.28925755160805,68.2307940292667,68.80629076783954,64.30212108133291,65.98344544567863,66.65133837562836,64.08457257002625,64.15238200928357,62.43739074933664,58.479065508645036,55.11024584133799,52.95393133457221,53.17956605052982,51.314413009749835,52.32816019421281,52.748296476122974,50.10027451492868,53.05580973604507,55.57019420004173,57.82425388892753,60.874309156414384,56.58732329297628,57.58085490090396,53.38968046379996,51.4348893183333,48.29156418364194,51.52922609596476,52.74928342218959,49.50859576128666];

test.ema = {
  _10: function(test) {
    var ema = new EMA(10);
    _.each(prices, function(p, i) {
      ema.update(p);
      test.equals(ema.result, verified_ema10results[i]);
    });
    test.done();
  },
  _12: function(test) {
    var ema = new EMA(12);
    _.each(prices, function(p, i) {
      ema.update(p);
      test.equals(ema.result, verified_ema12results[i]);
    });
    test.done();
  },
  _26: function(test) {
    var ema = new EMA(26);
    _.each(prices, function(p, i) {
      ema.update(p);
      test.equals(ema.result, verified_ema26results[i]);
    });
    test.done();
  }
};

// MACD results

var verified_macd12v26v9diff = [0,-4.547008547008545,-3.9892858012516115,-7.814553897296733,-9.68546703354523,-11.758855194041395,-9.500012810452446,-6.02656065453003,-2.678111693000716,-7.762054965956388,-4.955890237178558,-3.179483224749447,-2.070566240940323,-6.6026618662643415,-3.776210725235984,-2.4759859198692027,-4.859274338230051,-4.038668120840633,-5.264248228346467,-8.717175683191812,-11.004031373646804,-11.633288323448895,-9.600560425733171,-10.13217748107575,-7.4816532084116645,-5.8781751804450835,-7.825556495508927,-3.4387406426898934,-0.20190496720273643,2.256606231167005,5.1941109452040735,-0.2217370531452758,0.8823334558761218,-3.766982623447589,-5.29260653034283,-7.863478747649999,-3.166999957817737,-1.365861305295958,-4.64570012391512];
var verified_macd12v26v9signal = [0,-0.9094017094017091,-1.5253785277716898,-2.7832136016766986,-4.163664288050406,-5.6827024692486034,-6.446164537489373,-6.362243760897504,-5.625417347318147,-6.052744871045796,-5.833373944272349,-5.30259580036777,-4.65618988848228,-5.045484284038693,-4.791629572278152,-4.328500841796362,-4.4346555410831,-4.355458057034607,-4.537216091296979,-5.373208009675945,-6.499372682470117,-7.526155810665873,-7.941036733679333,-8.379264883158616,-8.199742548209226,-7.735429074656398,-7.753454558826904,-6.890511775599502,-5.55279041392015,-3.990911084902719,-2.153906678881361,-1.767472753734144,-1.2375115118120907,-1.7434057341391904,-2.4532458933799184,-3.535292464233935,-3.4616339629506956,-3.0424794314197485,-3.363123569918823];
var verified_macd12v26v9result = [0,-3.6376068376068362,-2.4639072734799217,-5.031340295620034,-5.521802745494824,-6.076152724792792,-3.053848272963074,0.33568310636747434,2.9473056543174314,-1.7093100949105917,0.8774837070937913,2.1231125756183227,2.585623647541957,-1.5571775822256484,1.0154188470421683,1.8525149219271597,-0.42461879714695083,0.3167899361939739,-0.7270321370494885,-3.3439676735158663,-4.504658691176687,-4.107132512783021,-1.6595236920538383,-1.7529125979171347,0.7180893397975616,1.8572538942113148,-0.07210193668202258,3.4517711329096086,5.350885446717413,6.247517316069724,7.3480176240854345,1.5457357005888681,2.1198449676882127,-2.0235768893083987,-2.839360636962912,-4.3281862834160645,0.2946340051329588,1.6766181261237905,-1.2825765539962966];

test.macd = {
  _12v26v9_diff: function(test) {
    var macd = new MACD({short: 12, long: 26, signal: 9});
    _.each(prices, function(p, i) {
      macd.update(p);
      test.equals(macd.diff, verified_macd12v26v9diff[i]);
    });
    test.done();
  },
  _12v26v9_signal: function(test) {
    var macd = new MACD({short: 12, long: 26, signal: 9});
    _.each(prices, function(p, i) {
      macd.update(p);
      test.equals(macd.signal.result, verified_macd12v26v9signal[i]);
    });
    test.done();
  },
  _12v26v9_result: function(test) {
    var macd = new MACD({short: 12, long: 26, signal: 9});
    _.each(prices, function(p, i) {
      macd.update(p);
      test.equals(macd.result, verified_macd12v26v9result[i]);
    });
    test.done();
  }
};

// PPO test results

var verified_ppo12v26v9 = [0,-5.922297673383055,-5.204813152773915,-10.775104631720897,-13.901816018390623,-17.719369436924076,-14.22599518036208,-8.779001074074772,-3.7775327599722406,-11.79779911287454,-7.3650541223130555,-4.659894802610166,-3.0092688006197794,-10.268186733549467,-5.72296687408477,-3.714833010426942,-7.582596159036941,-6.295429716477546,-8.431243146403258,-14.906489369094212,-19.9673059077387,-21.968696242678835,-18.053100351760996,-19.745285752660987,-14.297565938958984,-11.143819939485432,-15.619787658403148,-6.481364924591247,-0.3633332042639952,3.9025254618963814,8.5325172756507,-0.3918493405267646,1.5323382353294481,-7.05563807597937,-10.289915270521151,-16.28333826120637,-6.14602662946988,-2.589345706109427,-9.383623293044062];
var verified_ppod12v26v9signal = [0,-1.184459534676611,-1.9885302582960718,-3.745845132981037,-5.777039310062954,-8.16550533543518,-9.37760330442056,-9.257882858351403,-8.161812838675571,-8.889010093515365,-8.584218899274903,-7.799354079941956,-6.8413370240775215,-7.526706965971911,-7.165958947594484,-6.475733760160976,-6.697106239936169,-6.616770935244445,-6.979665377476208,-8.565030175799809,-10.845485322187589,-13.07012750628584,-14.066722075380872,-15.202434810836897,-15.021461036461314,-14.245932817066137,-14.52070378533354,-12.912836013185082,-10.402935451400865,-7.541843268741416,-4.3269711598629925,-3.539946795995747,-2.5254897897307083,-3.431519446980441,-4.8031986116885825,-7.099226541592141,-6.908586559167689,-6.044738388556036,-6.712515369453642];
var verified_ppod12v26v9hist = [0,-4.737838138706444,-3.2162828944778434,-7.02925949873986,-8.12477670832767,-9.553864101488896,-4.84839187594152,0.47888178427663064,4.3842800787033305,-2.9087890193591743,1.2191647769618479,3.13945927733179,3.832068223457742,-2.7414797675775553,1.4429920735097133,2.760900749734034,-0.8854899191007712,0.32134121876689914,-1.4515777689270495,-6.341459193294403,-9.121820585551113,-8.898568736392996,-3.9863782763801243,-4.54285094182409,0.7238950975023304,3.102112877580705,-1.099083873069608,6.431471088593835,10.03960224713687,11.444368730637798,12.859488435513693,3.1480974554689825,4.057828025060156,-3.6241186289989296,-5.486716658832568,-9.18411171961423,0.762559929697809,3.455392682446609,-2.6711079235904203];

test.ppo = {
  _12v26v9: function(test) {
    var ppo = new PPO({short: 12, long: 26, signal: 9});
    _.each(prices, function(p, i) {
      ppo.update(p);
      test.equals(ppo.ppo, verified_ppo12v26v9[i]);
    });
    test.done();
  },
  _12v26v9_signal: function(test) {
    var ppo = new PPO({short: 12, long: 26, signal: 9});
    _.each(prices, function(p, i) {
      ppo.update(p);
      test.equals(ppo.PPOsignal.result, verified_ppod12v26v9signal[i]);
    });
    test.done();
  },
  _12v26v9_hist: function(test) {
    var ppo = new PPO({short: 12, long: 26, signal: 9});
    _.each(prices, function(p, i) {
      ppo.update(p);
      test.equals(ppo.PPOhist, verified_ppod12v26v9hist[i]);
    });
    test.done();
  }
};

module.exports = test;