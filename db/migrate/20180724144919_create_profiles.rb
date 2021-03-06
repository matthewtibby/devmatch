class CreateProfiles < ActiveRecord::Migration[5.2]
  def change
    create_table :profiles do |t|
      t.integer :user_id
      t.string :first_name
      t.string :last_name
      t.string :job_title
      t.string :phone_number
      t.string :location
      t.string :linkdin_url
      t.string :contact_email
      t.text :description
      t.timestamps
      
    end
  end
end
