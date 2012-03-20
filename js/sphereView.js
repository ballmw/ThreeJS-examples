App.views.Sphere = Ext.extend(Ext.Panel, {
	layout : 'fit',
	cls : 'customPanel',
	fullscreen : true,
	scroll : false,
	listeners : {
		afterRender : {
			fn : function() { this.afterrender(); }
		}
	},
	initComponent : function() {
		//this.update.body('<div id="sphere"></div>');

		this.html = '<div id="sphere"></div>';

		App.views.Sphere.superclass.initComponent.call(this);
		
		
		console.log('init complete');
	},
	afterrender : function() {
		console.log('afterrender');
		this.div = $('#sphere');
		var examples = new App.Examples();
		examples.example1();
		this.div.append(examples.element);
		animate = function() {
			requestAnimationFrame(animate);
			examples.render();
		}
		animate();
	}
});
