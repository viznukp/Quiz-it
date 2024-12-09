# frozen_string_literal: true

desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["reset_and_populate_sample_data"].invoke if Rails.env.development?
end

desc "Populates sample data without resetting the database first"
task populate_sample_data: [:environment] do
  create_sample_data!
  puts "sample data has been added."
end

desc "Populates sample data without after resetting the database"
task reset_and_populate_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data"
  elsif Rails.env.staging?
    puts "Skipping deleting and populating sample data"
  else
    delete_all_records_from_all_tables
    Rake::Task["populate_sample_data"].invoke
  end
end

#
# DO NOT CHANGE ANYTHING IN THIS METHOD
# This is last layer of defense against deleting data in production
# If you need to delete data in staging or in production
# please execute the command manually and do not change this method
#
def delete_all_records_from_all_tables
  if Rails.env.production?
    raise "deleting all records in production is not alllowed"
  else
    Rake::Task["db:schema:load"].invoke
  end
end


def create_categories!
  ["Science", "Math", "History", "Literature", "Technology"].map do |category_name|
    Category.create!(name: category_name)
  end
end

def create_quizzes(categories, user)
  created_quizzes = categories.map do |category|
    quiz = Quiz.create!(
      name: "#{category.name} Quiz",
      category: category,
      status: %w[draft published].sample,
      creator: user
    )

    questions = sample_questions(category)

    questions.each do |question|
      Question.create!(
        question: question[:question],
        options: question[:options],
        answer_index: question[:answer_index],
        quiz: quiz
      )
    end
    quiz
  end
  created_quizzes
end


def sample_questions(category)
  case category.name
  when "Science"
    [
      { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "O2", "N2"], answer_index: 1 },
      { question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], answer_index: 2 },
      { question: "What is the process by which plants make their food?", options: ["Respiration", "Photosynthesis", "Digestion", "Absorption"], answer_index: 2 },
      { question: "What is the atomic number of Carbon?", options: ["6", "8", "12", "14"], answer_index: 1 },
      { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Diamond", "Iron", "Steel"], answer_index: 2 }
    ]
  when "Math"
    [
      { question: "What is 5 + 7?", options: ["11", "12", "13", "14"], answer_index: 2 },
      { question: "What is 9 * 8?", options: ["72", "64", "75", "78"], answer_index: 1 },
      { question: "What is the square root of 16?", options: ["2", "3", "4", "5"], answer_index: 3 },
      { question: "What is 100 divided by 5?", options: ["10", "15", "20", "25"], answer_index: 1 },
      { question: "What is the result of 7^2?", options: ["49", "56", "64", "42"], answer_index: 1 }
    ]
  when "History"
    [
      { question: "Who was the first president of the United States?", options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "Andrew Jackson"], answer_index: 1 },
      { question: "In which year did World War I begin?", options: ["1912", "1914", "1916", "1918"], answer_index: 2 },
      { question: "Who was the leader of Nazi Germany during World War II?", options: ["Adolf Hitler", "Joseph Stalin", "Winston Churchill", "Franklin D. Roosevelt"], answer_index: 1 },
      { question: "Which ancient civilization built the pyramids?", options: ["Romans", "Greeks", "Egyptians", "Aztecs"], answer_index: 3 },
      { question: "Who wrote the Declaration of Independence?", options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "Benjamin Franklin"], answer_index: 2 }
    ]
  when "Literature"
    [
      { question: "Who wrote 'Romeo and Juliet'?", options: ["Shakespeare", "Dickens", "Austen", "Hemingway"], answer_index: 1 },
      { question: "What is the title of the first Harry Potter book?", options: ["The Philosopher's Stone", "The Chamber of Secrets", "The Prisoner of Azkaban", "The Goblet of Fire"], answer_index: 1 },
      { question: "Who wrote 'Moby-Dick'?", options: ["Herman Melville", "Mark Twain", "Ernest Hemingway", "John Steinbeck"], answer_index: 1 },
      { question: "What is the name of the hobbit in 'The Hobbit'?", options: ["Frodo Baggins", "Samwise Gamgee", "Bilbo Baggins", "Gandalf"], answer_index: 3 },
      { question: "Who wrote 'Pride and Prejudice'?", options: ["Charlotte Brontë", "Jane Austen", "Emily Dickinson", "Virginia Woolf"], answer_index: 2 }
    ]
  when "Technology"
    [
      { question: "Who is known as the father of the computer?", options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"], answer_index: 1 },
      { question: "What year was the first iPhone released?", options: ["2005", "2007", "2009", "2010"], answer_index: 2 },
      { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Markup Language", "HyperTool Markup Language", "HyperText Management Language"], answer_index: 1 },
      { question: "Who invented the first practical telephone?", options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Michael Faraday"], answer_index: 2 },
      { question: "What is the main programming language used for iOS development?", options: ["Java", "Swift", "C#", "Python"], answer_index: 2 }
    ]
  end
end

def create_user!(options = {})
  user_attributes = {
    first_name: "Oliver",
    last_name: "Smith",
    password: "welcome",
    password_confirmation: "welcome",
    user_type: "admin"
  }
  attributes = user_attributes.merge(options)
  User.create!(attributes)
end

def create_submissions_for_three_quizzes!(users)
  quizzes = Quiz.limit(3)

  quizzes.each do |quiz|
    2.times do |i|
      submission = Submission.create!(
        user: users.sample,
        quiz: quiz,
        status: "completed",
        answers: create_random_answers(quiz)
      )
      EvaluationService.new.evaluate_submission(submission)
      submission.save!
    end
  end

  puts "Two submissions have been added for each of the three selected quizzes."
end

def create_random_answers(quiz)
  quiz.questions.map do |question|
    {question_id: question.id, selected_choice: rand(1..4)}
  end
end


def create_sample_data!
  organization =  Organization.create!({name: "Big Binary Academy", slug: "Big-Binary-Academy"})

  admin_user = create_user!(email: "oliver@example.com", first_name: "Oliver", last_name: "Smith", user_type: "admin", organization: organization)
  luna = create_user!(email: "luna@example.com", first_name: "Luna", last_name: "Smith", user_type: "standard", organization: organization)
  sam = create_user!(email: "sam@example.com", first_name: "Sam", last_name: "Smith", user_type: "standard", organization: organization)

  categories = create_categories!

  create_quizzes(categories, admin_user)
  create_submissions_for_three_quizzes!([luna, sam])

  puts "Sample data has been added."
end
