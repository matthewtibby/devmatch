class CreateContacts < ActiveRecord::Migration[5.0]  #change to 5.2 if possible
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :email
      t.text :comments
      t.timestamps
    end
  end
end