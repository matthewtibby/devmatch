class ContactsController < ApplicationController
  
  #Get request to /contact-us
  #Show new contact form
  def new
    @contact = Contact.new
  end
  
  #Post request to  /contacts
  def create
    #Mass assignment of form fields into contact object
    @contact = Contact.new(contact_params)
    #Save the contact object to he data base.
    if @contact.save
    #Store form fiels via params  into variables
      name = params[:contact][:name]
      email = params[:contact][:email]
      body = params[:contact][:comments]
    #Plug variables into contact mailer email method and send email.
      ContactMailer.contact_email(name, email, body).deliver
    #Store success message in flash  hash
    #Redirect to the new action.
      flash[:success] = "Message Sent."
       redirect_to new_contact_path
    else
      #If contact object does not save, store errors in flash hash
      #redirect to the new action path.
      flash[:danger] = @contact.errors.full_messages.join(", ")
       redirect_to new_contact_path
    end
  end  
  
  
  private
  #To collect data from form use strong params and whitelist form fields
  def contact_params
     params.require(:contact).permit(:name, :email, :comments)
  end
end
