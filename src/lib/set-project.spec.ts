import gcloud from './gcloud';
import setProject from './set-project';

jest.mock('./gcloud');

describe(setProject, () => {
  beforeEach(() => {
    (gcloud as jest.Mock).mockReset();
  });

  it('should call gcloud to set the project', async () => {
    (gcloud as jest.Mock).mockImplementationOnce(() => Promise.resolve(0));
    await expect(setProject('test')).resolves.toBe(0);
    expect(gcloud).toHaveBeenCalledWith(['config', 'set', 'project', 'test']);
  });

  it('should not call gcloud on empty project', async () => {
    await expect(setProject('')).resolves.toBe(0);
    expect(gcloud).not.toHaveBeenCalled();
  });
});
