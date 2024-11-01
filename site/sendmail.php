<?php

    $site_owners_email = 'contato@nmts.com.br'; // Replace this with your own email address
    $site_owners_name = 'NMTS - Luis Rizzi'; // replace with your name
	
	
	$name = filter_var( $_POST['name'] );
	// $tel = filter_var( $_POST['tel'] );
	// $date = filter_var( $_POST['date'] );
	// $time = filter_var( $_POST['time'] );

	$email = filter_var( $_POST['email'] );
	$subject = filter_var( $_POST['subject'] );
	$message = filter_var( $_POST['message'] );

	$isSubmitTypeAjax = filter_var( $_POST['submitType'] );
	
	
	$nameText = '';
	$telText = '';
	$emailText = '';
	$dateText = '';
	$timeText = '';
	//$footerText = '<br/><br/><div style="font-size: 12px;">This email is submitted form: ' . (isset($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER[HTTP_HOST] . '</div>';
	
	
	if ( !empty($name) ) {
		$nameText .= '<b>Nomee:</b> ' . $name . '<br/>';
	}
	
	if ( !empty($tel) ) {
		$telText .= '<b>Telefone:</b> ' . $tel . '<br/>';
	}
	
	if ( !empty($email) ) {
		$emailText .= '<b>E-mail:</b> ' . $email . '<br/>';
	}
	
	if ( !empty($date) ) {
		$dateText .= '<b>Dia:</b> ' . $date . '<br/>';
	}
	
	if ( !empty($time) ) {
		$timeText .= '<b>Hora:</b> ' . $time . '<br/>';
	}
	
	
	if ( !empty($isSubmitTypeAjax) ) {
		require_once('phpmailer/class.phpmailer.php');
		$mail = new PHPMailer();
		
		$mail->From = $email;
		$mail->FromName = $name;
		$mail->Subject = $subject;

		$mail->AddAddress($site_owners_email, $site_owners_name);
		$mail->IsHTML(true);
		
		$mail->Body = $nameText . $emailText . '<br/>' . $message ;
			
		if ( isset( $_FILES['file'] ) && $_FILES['file']['error'] == UPLOAD_ERR_OK ) {
			$mail->AddAttachment( $_FILES['file']['tmp_name'], $_FILES['file']['name'] );
		}
		
		$mail->Send();
		
		
		echo '<div class="alert alert-success"  role="alert">Muito obrigado pelo contato. A sua mensagem foi enviada com sucesso!.</div>';
	} else {
		// do nothing...
	}

?>
