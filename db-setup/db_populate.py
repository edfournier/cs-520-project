import json
from utils.preprocessing import preprocess_class_data, preprocess_course_data
from utils.sqlite3_ops import construct_query_with_values, open_db_connection, purge_db

## file paths
RELATIVE_PATH = '.' # NOTE: Change this to match local execution context
DB_PATH = f'{RELATIVE_PATH}/spring-boot/class_c.db'
SETUP_FOLDER_PATH = f'{RELATIVE_PATH}/db-setup'
COURSE_PATH = f'{SETUP_FOLDER_PATH}/scrape/courses.json'
RATINGS_PATH = f'{SETUP_FOLDER_PATH}/scrape/ratings.csv'
SETUP_QUERIES_PATH = f'{SETUP_FOLDER_PATH}/queries/setup.json'
MANAGE_CLASSES_QUERIES_PATH = f'{SETUP_FOLDER_PATH}/queries/manage_classes.json'
MANAGE_RATINGS_QUERIES_PATH = f'{SETUP_FOLDER_PATH}/queries/manage_ratings.json'


## --- Read data from sources --- ##
raw_data_ratings = []
raw_data_courses = {}

with open(COURSE_PATH, 'r') as courses_file:
    raw_data_courses = json.load(courses_file) # [{code, name, subject, description}]

with open(RATINGS_PATH, 'r') as ratings_file:
    ratings_file.readline() # skip the header line
    for line in ratings_file:
        raw_data_ratings.append(line.strip().split(',')) # class, difficulty, helpfulness, professor, date


## --- Prepare Data --- ##
data_courses = preprocess_course_data(raw_data_courses)
data_classes = preprocess_class_data(raw_data_ratings)


## --- Reset, Create and Populate Database --- ##
# Purge DB
purge_db(DB_PATH)

# Create DB and Open DB connection
db_connection = open_db_connection(DB_PATH)
cursor = db_connection.cursor()

# Table Creation
with open(SETUP_QUERIES_PATH) as queries:
    queries = json.load(queries)
    cursor.execute(queries['create_table_user'])
    cursor.execute(queries['create_table_session'])
    cursor.execute(queries['create_table_course'])
    cursor.execute(queries['create_table_uni_class'])
    cursor.execute(queries['create_table_aggr_rating'])
    cursor.execute(queries['create_table_user_rating'])
    cursor.execute(queries['create_table_user_interest'])
    cursor.execute(queries['create_table_friendship'])
    cursor.execute(queries['create_table_friend_request'])
    db_connection.commit()

# Data Population - Courses and Classes
with open(MANAGE_CLASSES_QUERIES_PATH) as class_queries:
    class_queries = json.load(class_queries)

    # Construct Insert Queries
    query_insert_courses = construct_query_with_values(class_queries["insert_course"], data_courses)
    query_insert_classes = construct_query_with_values(class_queries["insert_class"], data_classes) # the last 2 fields per record are ignored here

    # Execute Insert Queries
    cursor.execute(query_insert_courses)
    cursor.execute(query_insert_classes)

    db_connection.commit()

# Data Population - RMP Ratings
with open(MANAGE_RATINGS_QUERIES_PATH) as rating_queries:
    rating_queries = json.load(rating_queries)
    query_insert_aggr_rating = construct_query_with_values(rating_queries["insert_aggregate_rating_initial_load"], data_classes)
    cursor.execute(query_insert_aggr_rating)
    db_connection.commit()
