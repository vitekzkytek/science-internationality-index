#%%
# Connect to AWS RDS
def populateAmazonDB():
    d = {
      "database": "scienceInternationalitydb",
      "schema": "public",
      "user": "root",
      "passw": "IDEA_science2018",
      "db-host": "science-internationality-dbinstance.c3aa5fkeiz2h.us-east-2.rds.amazonaws.com",
      "ssh-host":"ec2-18-188-88-0.us-east-2.compute.amazonaws.com",
      #"private-key":"C:\\Users\\vitekzkytek\\Dropbox\\Hugo\\science-internationality-index\\Authorization\\idea-webserver-key-par.pem",
      "private-key":"D:\\Dropbox\\Hugo\\science-internationality-index\\Authorization\\idea-webserver-keypair.pem",
      "ssh-user":"ubuntu",
      "db-port": 5432,
      "ssh-port":22
    }
    from sshtunnel import SSHTunnelForwarder

    tunnel = SSHTunnelForwarder(
        (d['ssh-host'], d['ssh-port']),
        ssh_username=d['ssh-user'],
        ssh_private_key=d['private-key'],
        remote_bind_address=('localhost', d['db-port']),
        local_bind_address=('localhost',d['ssh-port']) # could be any available port
    )

    # Start the tunnel
    tunnel.start()

    from sqlalchemy import create_engine
    conn = create_engine('postgres://{}:{}@{}:{}/{}'.format(d['user'],d['passw'],'localhost',d['ssh-port'],d['database']))


    #%%
    import pandas as pd
    from InternationalityIndex.plotting import readSavedInternationalityData

    # load data
    df = readSavedInternationalityData('20181101_AllFieldsCountriesMethods_TOP.xlsx').reset_index()
    countries = pd.read_excel('AWS_Import/populateAmazon.xlsx',sheet_name='country')
    countries.pop2017 = countries.pop2017.map(lambda x : '%.0f'%x).replace('nan','')
    countries.to_csv('AWS_Import/country.csv',index=False)
    method = pd.read_excel('AWS_Import/populateAmazon.xlsx',sheet_name='method').to_csv('AWS_Import/method.csv',index=False)
    field = pd.read_excel('AWS_Import/populateAmazon.xlsx',sheet_name='field').to_csv('AWS_Import/field.csv',index=False)
    index = pd.read_excel('AWS_Import/populateAmazon.xlsx',sheet_name='index',index=False)
    merged = pd.merge(df,countries,how='left',left_on='Country',right_on='my_name').loc[:,['country_code','Field','Method','Period',0]]
    merged.columns = index.columns
    merged.to_csv('AWS_Import/index.csv',index=False)


    #%%
    ## GENERATE JSON DATA FOR STATIC WEBSITE
    tunnel.stop()
