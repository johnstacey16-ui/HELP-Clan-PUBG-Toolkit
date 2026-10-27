'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const src=read('js/sensitivity.js');
const constants=vm.runInNewContext('('+src.match(/const SCOPE_CONST = (\{[\s\S]*?\n\});/)[1]+')');
const functions=src.match(/function pixelSpeed\(C, A, B\)\{[\s\S]*?\n\}\s*function matchedSens\(speed, A, B\)\{[\s\S]*?\n\}/)[0];
const model=vm.runInNewContext(functions+';({pixelSpeed,matchedSens})');
test('Aim shares the supplied 15x constants and all original scopes retain their calibrations',()=>{
 assert.deepEqual(JSON.parse(JSON.stringify(constants.aim)),JSON.parse(JSON.stringify(constants['15x'])));
 assert.equal(constants.aim.A,53);assert.equal(constants.aim.B,0.2);
 const expected={'1x':[64,2],'2x':[54,.6],'3x':[70,.6],'4x':[50,.6],'6x':[35,.6],'8x':[35,.6],'15x':[53,.2]};
 for(const [key,[A,B]] of Object.entries(expected)){assert.equal(constants[key].A,A);assert.equal(constants[key].B,B);}
 for(const C of [0,1.3,10,14.7,20])assert.equal(model.pixelSpeed(C,constants.aim.A,constants.aim.B),model.pixelSpeed(C,constants['15x'].A,constants['15x'].B));
});
test('matched settings reproduce the reference speed across every aiming mode',()=>{
 for(const C of [0,5,12,20])for(const ref of Object.values(constants)){
  const speed=model.pixelSpeed(C,ref.A,ref.B);
  for(const target of Object.values(constants)){
   const matched=model.matchedSens(speed,target.A,target.B);
   assert.ok(Math.abs(model.pixelSpeed(matched,target.A,target.B)-speed)<1e-8);
  }
 }
});
test('Combat Lab owns range and TTK engines and supports a TTK model display',()=>{
 const html=read('index.html'),nav=read('js/app-navigation.js'),controller=read('src/calculators/45-hit-zone-explorer.part');
 assert.match(html,/<option value="ttk">Time to kill \(seconds\)<\/option>/);
 assert.match(html,/<div id="panel-range" class="combat-result-section">/);
 assert.match(html,/<div id="panel-ttk" class="combat-result-section">/);
 assert.doesNotMatch(html,/data-open-panel="panel-(?:range|ttk)"/);
 assert.match(nav,/labAnchors\.has\(id\)\?'panel-hit-zone'/);
 assert.match(controller,/pureTtk\(zone\.htk,currentWeapon\(\)\?\.rpm\)/);
 assert.doesNotMatch(html,/<details[^>]+visual-(?:opt-in-art|art-panel)/);
});
