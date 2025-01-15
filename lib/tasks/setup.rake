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
    raise "deleting all records in production is not allowed"
  else
    Rake::Task["db:schema:load"].invoke
    Question.reset_column_information
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
      status: "draft",
      creator: user,
      accessibility: "discoverable",
    )

    questions = sample_questions(category)

    questions.each do |question|
      Question.create!(
        question: question[:question],
        options: {entries: question[:options]},
        answer_id: question[:answer_id],
        quiz: quiz
      )
    end
    quiz
  end
  created_quizzes
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
    quiz.update!(status: "published")
    2.times do |i|
      answers = create_random_answers(quiz)
      submission_params = ActionController::Parameters.new(
        {submission: { status: "completed", answers:}, user_id: users[i].id, slug: quiz.slug,}
      )
      EvaluationService.new(submission_params).process!
    end
  end

  puts "Two submissions have been added for each of the three selected quizzes."
end

def create_random_answers(quiz)
  answers = quiz.questions.map do |question|
    options = question.options["entries"]
    selected_choice = options.sample["id"]

    { question_id: question.id, selected_choice: selected_choice }
  end
  answers
end

def create_sample_data!
  organization =  Organization.create!({name: "QuizIt", slug: "quiz-it"})

  admin_user = create_user!(email: "oliver@example.com", first_name: "Oliver", last_name: "Smith", user_type: "admin", organization: organization)
  luna = create_user!(email: "luna@example.com", first_name: "Luna", last_name: "Smith", user_type: "standard", organization: organization)
  sam = create_user!(email: "sam@example.com", first_name: "Sam", last_name: "Smith", user_type: "standard", organization: organization)

  categories = create_categories!

  create_quizzes(categories, admin_user)
  create_submissions_for_three_quizzes!([luna, sam])

  puts "Sample data has been added."
end


def sample_questions(category)
  case category.name
  when "Science"
    [
      {
        "question": "What is the chemical symbol for water?",
        "options": [
          { "id": 1, "option": "H2O" },
          { "id": 2, "option": "CO2" },
          { "id": 3, "option": "O2" },
          { "id": 4, "option": "N2" }
        ],
        "answer_id": 1
      },
      {
        "question": "What planet is known as the Red Planet?",
        "options": [
          { "id": 1, "option": "Earth" },
          { "id": 2, "option": "Mars" },
          { "id": 3, "option": "Venus" },
          { "id": 4, "option": "Jupiter" }
        ],
        "answer_id": 2
      },
      {
        "question": "What is the process by which plants make their food?",
        "options": [
          { "id": 1, "option": "Respiration" },
          { "id": 2, "option": "Photosynthesis" },
          { "id": 3, "option": "Digestion" },
          { "id": 4, "option": "Absorption" }
        ],
        "answer_id": 2
      },
      {
        "question": "What is the atomic number of Carbon?",
        "options": [
          { "id": 1, "option": "6" },
          { "id": 2, "option": "8" },
          { "id": 3, "option": "12" },
          { "id": 4, "option": "14" }
        ],
        "answer_id": 1
      },
      {
        "question": "What is the hardest natural substance on Earth?",
        "options": [
          { "id": 1, "option": "Gold" },
          { "id": 2, "option": "Diamond" },
          { "id": 3, "option": "Iron" },
          { "id": 4, "option": "Steel" }
        ],
        "answer_id": 2
      }
    ]
  when "Math"
    [
      {
        "question": "What is 5 + 7?",
        "options": [
          { "id": 1, "option": "11" },
          { "id": 2, "option": "12" },
          { "id": 3, "option": "13" },
          { "id": 4, "option": "14" }
        ],
        "answer_id": 2
      },
      {
        "question": "What is 9 * 8?",
        "options": [
          { "id": 1, "option": "72" },
          { "id": 2, "option": "64" },
          { "id": 3, "option": "75" },
          { "id": 4, "option": "78" }
        ],
        "answer_id": 1
      },
      {
        "question": "What is the square root of 16?",
        "options": [
          { "id": 1, "option": "2" },
          { "id": 2, "option": "3" },
          { "id": 3, "option": "4" },
          { "id": 4, "option": "5" }
        ],
        "answer_id": 3
      },
      {
        "question": "What is 100 divided by 5?",
        "options": [
          { "id": 1, "option": "10" },
          { "id": 2, "option": "15" },
          { "id": 3, "option": "20" },
          { "id": 4, "option": "25" }
        ],
        "answer_id": 3
      },
      {
        "question": "What is the result of 7^2?",
        "options": [
          { "id": 1, "option": "49" },
          { "id": 2, "option": "56" },
          { "id": 3, "option": "64" },
          { "id": 4, "option": "42" }
        ],
        "answer_id": 1
      }
    ]

  when "History"
    [
      {
        "question": "Who was the first president of the United States?",
        "options": [
          { "id": 1, "option": "George Washington" },
          { "id": 2, "option": "Abraham Lincoln" },
          { "id": 3, "option": "Thomas Jefferson" },
          { "id": 4, "option": "Andrew Jackson" }
        ],
        "answer_id": 1
      },
      {
        "question": "In which year did World War I begin?",
        "options": [
          { "id": 1, "option": "1912" },
          { "id": 2, "option": "1914" },
          { "id": 3, "option": "1916" },
          { "id": 4, "option": "1918" }
        ],
        "answer_id": 2
      },
      {
        "question": "Who was the leader of Nazi Germany during World War II?",
        "options": [
          { "id": 1, "option": "Adolf Hitler" },
          { "id": 2, "option": "Joseph Stalin" },
          { "id": 3, "option": "Winston Churchill" },
          { "id": 4, "option": "Franklin D. Roosevelt" }
        ],
        "answer_id": 1
      },
      {
        "question": "Which ancient civilization built the pyramids?",
        "options": [
          { "id": 1, "option": "Romans" },
          { "id": 2, "option": "Greeks" },
          { "id": 3, "option": "Egyptians" },
          { "id": 4, "option": "Aztecs" }
        ],
        "answer_id": 3
      },
      {
        "question": "Who wrote the Declaration of Independence?",
        "options": [
          { "id": 1, "option": "George Washington" },
          { "id": 2, "option": "Thomas Jefferson" },
          { "id": 3, "option": "Abraham Lincoln" },
          { "id": 4, "option": "Benjamin Franklin" }
        ],
        "answer_id": 2
      }
    ]
  when "Literature"
    [
      {
        "question": "Who wrote 'Romeo and Juliet'?",
        "options": [
          { "id": 1, "option": "Shakespeare" },
          { "id": 2, "option": "Dickens" },
          { "id": 3, "option": "Austen" },
          { "id": 4, "option": "Hemingway" }
        ],
        "answer_id": 1
      },
      {
        "question": "What is the title of the first Harry Potter book?",
        "options": [
          { "id": 1, "option": "The Philosopher's Stone" },
          { "id": 2, "option": "The Chamber of Secrets" },
          { "id": 3, "option": "The Prisoner of Azkaban" },
          { "id": 4, "option": "The Goblet of Fire" }
        ],
        "answer_id": 1
      },
      {
        "question": "Who wrote 'Moby-Dick'?",
        "options": [
          { "id": 1, "option": "Herman Melville" },
          { "id": 2, "option": "Mark Twain" },
          { "id": 3, "option": "Ernest Hemingway" },
          { "id": 4, "option": "John Steinbeck" }
        ],
        "answer_id": 1
      },
      {
        "question": "What is the name of the hobbit in 'The Hobbit'?",
        "options": [
          { "id": 1, "option": "Frodo Baggins" },
          { "id": 2, "option": "Samwise Gamgee" },
          { "id": 3, "option": "Bilbo Baggins" },
          { "id": 4, "option": "Gandalf" }
        ],
        "answer_id": 3
      },
      {
        "question": "Who wrote 'Pride and Prejudice'?",
        "options": [
          { "id": 1, "option": "Charlotte Brontë" },
          { "id": 2, "option": "Jane Austen" },
          { "id": 3, "option": "Emily Dickinson" },
          { "id": 4, "option": "Virginia Woolf" }
        ],
        "answer_id": 2
      }
    ]

  when "Technology"
    [
      {
        "question": "Who is known as the father of the computer?",
        "options": [
          { "id": 1, "option": "Charles Babbage" },
          { "id": 2, "option": "Alan Turing" },
          { "id": 3, "option": "Bill Gates" },
          { "id": 4, "option": "Steve Jobs" }
        ],
        "answer_id": 1
      },
      {
        "question": "What year was the first iPhone released?",
        "options": [
          { "id": 1, "option": "2005" },
          { "id": 2, "option": "2007" },
          { "id": 3, "option": "2009" },
          { "id": 4, "option": "2010" }
        ],
        "answer_id": 2
      },
      {
        "question": "What does HTML stand for?",
        "options": [
          { "id": 1, "option": "HyperText Markup Language" },
          { "id": 2, "option": "HighText Markup Language" },
          { "id": 3, "option": "HyperTool Markup Language" },
          { "id": 4, "option": "HyperText Management Language" }
        ],
        "answer_id": 1
      },
      {
        "question": "Who invented the first practical telephone?",
        "options": [
          { "id": 1, "option": "Thomas Edison" },
          { "id": 2, "option": "Alexander Graham Bell" },
          { "id": 3, "option": "Nikola Tesla" },
          { "id": 4, "option": "Michael Faraday" }
        ],
        "answer_id": 2
      },
      {
        "question": "What is the main programming language used for iOS development?",
        "options": [
          { "id": 1, "option": "Java" },
          { "id": 2, "option": "Swift" },
          { "id": 3, "option": "C#" },
          { "id": 4, "option": "Python" }
        ],
        "answer_id": 2
      }
    ]
  end
end
