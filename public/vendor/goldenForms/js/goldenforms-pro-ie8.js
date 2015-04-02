$(function(){		   
	$('.goldenforms-pro input[type="checkbox"]:checked, .goldenforms-pro input[type="radio"]:checked').addClass('checked');
	$('.goldenforms-pro').on('click', 'input[type="radio"]', function(){
		$(this).closest('.goldenforms-pro').find('input[name="' + $(this).attr('name') + '"]').removeClass('checked').addClass('unchecked');	
		$(this).addClass('checked').removeClass('unchecked');		
	});
	
	$('.goldenforms-pro').on('change', 'input[type="checkbox"]', function(){
		$(this).toggleClass('checked');
	});
	
});


