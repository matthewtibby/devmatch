class Users::RegistrationsController < Devise::RegistrationsController
  #extend default Devise gem behaviour so that users signing up with pro account 
  #save with a special stripe subscription function.
  #Otherwise devise signs up user as usual.
  def create
    super do |resource|
      if params[:plan]
        resource.plan_id = params[:plan]
        if resource.plan_id == 1
          resource.save_with_subscription
        else
          resource.save
        end
      end
    end
  end
end